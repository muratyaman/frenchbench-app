import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwtManager from 'jsonwebtoken';
import { Pool } from 'pg';
import { v4 as newUuid } from 'uuid';

export const ts   = () => (new Date()).toISOString();
export const log  = (...args) => console.log.call(...args);
export const penv = () => process.env;

export let { NODE_ENV, JWT_SECRET, GEO_LAT_DELTA, GEO_LON_DELTA } = penv();
export const IS_PROD = NODE_ENV === 'production';
export const FB_SECRET_COOKIE = 'fbsecret';

// table names in the database
export const TBL_USER         = 'users';
export const TBL_ASSET        = 'assets';
export const TBL_ENTITY_ASSET = 'entities_assets';
export const TBL_LOOKUP       = 'lookups';
export const TBL_POST         = 'posts';

export const tablesFields = {
  [TBL_USER]:         ['id', 'username', 'password_hash', 'first_name', 'last_name', 'email', 'headline', 'neighbourhood', 'lat', 'lon', 'raw_geo', 'created_at', 'updated_at'],
  [TBL_ASSET]:        ['id', 'asset_type', 'media_type', 'label', 'url', 'meta', 'created_at', 'updated_at', 'created_by', 'updated_by'],
  [TBL_ENTITY_ASSET]: ['id', 'parent_entity_kind', 'parent_entity_id', 'asset_id', 'purpose', 'meta', 'created_at', 'updated_at', 'created_by', 'updated_by'],
  [TBL_LOOKUP]:       ['id', 'category', 'value', 'label', 'meta', 'created_at', 'updated_at', 'created_by', 'updated_by'],
  [TBL_POST]:         ['id', 'user_id', 'post_ref', 'title', 'content', 'tags', 'created_at', 'updated_at', 'created_by', 'updated_by'],
};

export default async function pgHandler(req, res) {
  req.ts = new Date();
  req.id = newUuid();
  log('new request', ts(), 'start', req.ts, 'id', req.id);
  let output = null, user = null;
  const pool = new Pool(); // we rely on default env keys and values for PostgreSQL
  try {
    const db = extendDb(pool);
    const now = await db.now(); // make sure we can connect
    log('db now', ts(), req.id, now);

    const api = newApi({ db });

    try { // do we have a user session?
      let token = null, tokenType = null;
      const { cookie = null, authorization = null } = req.headers;
      if (cookie) { // do we have a session cookie?
        tokenType = 'bearer';
        token = parseFbCookie(cookie);
      } else if (authorization) { // do we have an authorization header?
        const authParts = authorization.split(' '); // e.g. 'Bearer a-long-json-web-token'
        tokenType = authParts[0];
        token = authParts[1];
      }
      if (token && tokenType && tokenType.toLowerCase() === 'bearer') {
        const decoded = jwtManager.verify(token, JWT_SECRET);
        log('token', ts(), req.id, decoded); // e.g. { id: 'uuid', username: 'haci', iat: 1601748833, exp: 1601835233 }
        user = decoded;
      }
    } catch (jwtError) {
      log('token error', ts(), req.id, jwtError);
    }

    const { action = '', id = null, input = {} } = req.body;

    if (action && (action !== '_isAllowed') && (action in api)) {
      api._isAllowed({ action, user, id, input });
    } else {
      throw Error('invalid api action');
    }

    output = await api[action]({ user, id, input }); // run api action

    if (output && output.data && output.data.token) { // special case
      const cookieStr = serializeFbCookie(output.data.token);
      res.setHeader('Set-Cookie', cookieStr); // keep auth token as cookie on frontend
    }
  } catch (err) {
    log('error', ts(), req.id, err);
    output = { error: err.message };
  } finally {
    await pool.end();
  }
  // try to send status 200, always! HTTP is merely a way of talking to backend; no need for a RESTful service.
  res.json(output);
}

export function extendDb(db) {

  const placeHolder = (idx) => {
    return '$' + idx;
  };

  const query = async (text, values = [], name = null) => {
    let result = null, error = null;
    try {
      if (name) { // reusable prepared query
        result = await db.query({ text, values, name });
      } else {
        result = await db.query(text, values);
      }
    } catch (err) {
      log('db query', ts(), text);
      log('db error', ts(), err);
      error = err;
    }
    return { result, error };
  };

  const findOne = async (table, field, value) => {
    const { result, error } = await query(
      `SELECT * FROM ${table} WHERE ${field} = ` + placeHolder(1),
      [value],
      table + '-find-one-by-' + field,
    );
    const row = result && result.rows && result.rows.length ? result.rows[0] : null;
    return { result, error, row };
  };

  const insertOne = async (tableName, row) => {
    const fields = [], params = [], placeHolders = [];
    Object.entries(row).forEach(([field, value]) => {
      fields.push(field);
      params.push(value);
      placeHolders.push(placeHolder(params.length));
    });
    // param placeholders: $1, $2, etc.
    const text = 'INSERT INTO ' + tableName + ' (' + fields.join(', ') + ') '
      + 'VALUES (' + placeHolders.join(', ') + ') '
      + 'RETURNING *';
    return query(text, params);
  };

  const update = async (tableName, condition, row, limit = 0) => {
    const assignments = [], where = [], params = [];
    Object.entries(row).forEach(([field, value]) => {
      params.push(value);
      assignments.push(field + ' = ' + placeHolder(params.length));
    });
    Object.entries(condition).forEach(([field, value]) => {
      params.push(value);
      where.push(field + ' = ' + placeHolder(params.length));
    });
    const assignmentsStr = assignments.join(', ');
    const whereStr = where ? ' WHERE ' + where.join(' AND ') : '';
    const limitStr = limit ? `LIMIT ${limit}` : '';
    const text = `UPDATE ${tableName} SET ${assignmentsStr} ${whereStr} ${limitStr}`;
    return query(text, params);
  };

  const deleteOne = async (tableName, condition, limit = 1) => {
    const where = [], params = [];
    Object.entries(condition).forEach(([field, value]) => {
      params.push(value);
      where.push(field + ' = ' + placeHolder(params.length));
    });
    const whereStr = where ? 'WHERE ' + where.join(' AND ') : '';
    const limitStr = limit ? `LIMIT ${limit}` : '';
    const text = `DELETE FROM ${tableName} ${whereStr} ${limitStr}`;
    return query(text, params);
  };

  const now = async() => db.query('SELECT NOW() AS ts');

  return {
    query,
    findOne,
    insertOne,
    update,
    deleteOne,
    now,
  };
}

export function newApi({ db }) {

  async function signup(req, res) {
    let data = null, error = null;
    try {
      let { username = '', password = '', password_confirm = '' } = req.body;
      const usernamePruned = pruneUsername(username);
      if (usernamePruned !== username) {
        throw new ErrBadRequest('invalid username');
      }
      if (!(password && password !== '' && password === password_confirm)) {
        throw new ErrBadRequest('enter a strong password');
      }
      if (!isStrongPassword(password)) {
        throw new ErrBadRequest('enter a strong password');
      }

      const { row: userFound, error: userLookupError } = await db.findOne(TBL_USER, 'username', username);
      if (userFound) throw new ErrBadRequest('enter another username');
      if (userLookupError) { // this is unexpected
        // throw new ErrBadRequest('enter another username');
        throw new Error('there was an error, please try again later');
      }
      const password_hash = await hashPassword(password);
      if (!password_hash) { // this is unexpected
        throw new Error('there was an error, please try again later');
      }
      const id = newUuid(), dt = new Date();
      const userRow = {
        id,
        created_at: dt,
        updated_at: dt,
        username,
        password_hash,
      };
      const { result, error: insertError } = await db.insertOne(TBL_USER, userRow);
      if (insertError) { // this is unexpected
        // throw insertError;
        throw new Error('there was an error, please try again later');
      }

      data = result && result.rowCount ? id : null;
    } catch (err) {
      error = err.message;
    }
    return { data, error };
  }

  async function signin({ input }) {
    let data, token, error = 'Invalid credentials';

    let { username = '', password = '' } = input;
    username.trim().toLowerCase();
    if (!(username && username !== '' && password && password !== '')) throw new Error(error);

    const { row: found, error: userLookupError } = await db.findOne(TBL_USER, 'username', username);
    if (userLookupError) throw userLookupError;
    if (!found) throw new ErrNotFound(error);

    const passwordOK = await verifyPassword(password, found.password_hash);
    if (!passwordOK) throw new Error(error);

    const { id } = found;
    const userData = { id, username }; // TODO: do not use username, it may be updated by user
    token = jwtManager.sign(userData, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
    data = { id, username, token, token_type: 'Bearer' };
    error = null;

    return { data, error };
  }

  // we can use user_retrieve
  async function user_retrieve_current({ user = {} }) {
    const { id = null } = user;
    const { row, error } = await db.findOne(TBL_USER, 'id', id);
    const data = hideSensitiveUserProps(row);
    return { data, error };
  }

  async function user_retrieve({ user, id }) {
    let data = null, error = null;
    // TODO: analytics of 'views' per record per visitor per day
    const { row, error: findUserError } = await db.findOne(TBL_USER, 'id', id);
    if (findUserError) throw findUserError;
    data = hideSensitiveUserProps(row);
    return { data, error };
  }

  async function user_search({ user, input = {} }) {
    let data = [], error = null;
    let { lat1 = 0, lon1 = 0, lat2 = 0, lon2 = 0 } = input;
    // TODO: restrict area that can be searched e.g. by geolocation of current user
    lat1 = lat1 ? lat1 : user.lat - GEO_LAT_DELTA;
    lat2 = lat2 ? lat2 : user.lat + GEO_LAT_DELTA;
    lon1 = lon1 ? lon1 : user.lon - GEO_LON_DELTA;
    lon2 = lon2 ? lon2 : user.lon + GEO_LON_DELTA;
    const { result, error: user_search_err } = await db.query(
      'SELECT * FROM ' + TBL_USER
      + ' WHERE (lat BETWEEN $1 AND $2)'
      + '   AND (lon BETWEEN $3 AND $4)',
      [lat1, lat2, lon1, lon2],
      'users-in-area',
    );
    if (user_search_err) throw user_search_err;
    data = result.rows.map(hideSensitiveUserProps);
    return { data, error };
  }

  async function usercontact_update({ user, id, input }) {
    // permission is checked by _isProtected()
    // let { first_name, last_name, email, phone, headline, neighbourhood } = input;
    let change = { ...input, updated_at: new Date() }; // TODO: limit inputs?
    const condition = { id }; // TODO: for now, only user himself can update
    let { result, error } = await db.update(TBL_USER, condition, change);
    return { data: result && result.rowCount, error };
  }

  async function usercontact_update_self({ user, input }) {
    // permission is checked by _isProtected()
    // let { first_name, last_name, email, phone, headline, neighbourhood } = input;
    let change = { ...input, updated_at: new Date() }; // TODO: limit inputs?
    const condition = { id: user.id }; // TODO: for now, only user himself can update
    let { result, error } = await db.update(TBL_USER, condition, change);
    return { data: result && result.rowCount, error };
  }

  async function usergeo_update({ user, id, input }) {
    // permission is checked by _isProtected()
    let { lat, lon, raw_geo } = input;
    let change = { lat, lon, raw_geo, updated_at: new Date() };
    const condition = { id }; // TODO: for now, only user himself can update
    let { result, error } = await db.update(TBL_USER, condition, change);
    return { data: result && result.rowCount, error };
  }

  async function usergeo_update_self({ user, input }) {
    // permission is checked by _isProtected()
    let { lat, lon, raw_geo } = input;
    let change = { lat, lon, raw_geo, updated_at: new Date() };
    const condition = { id: user.id }; // TODO: for now, only user himself can update
    let { result, error } = await db.update(TBL_USER, condition, change);
    return { data: result && result.rowCount, error };
  }

  function makePostRef(post_ref = '') {
    let ref = post_ref.replace(/[^a-zA-Z0-9]/, '-');
    if (ref === '') ref = (new Date()).toISOString();
    return ref;
  }

  async function post_create({ user, input }) {
    if (!user) throw new ErrForbidden();

    let { post_ref = '', title = '', content = '', tags = '' } = input;
    const dt = new Date();
    const id = newUuid();
    if (!title) title = 'my post at ' + dt.toISOString();
    if (!post_ref) post_ref = title;
    post_ref = makePostRef(post_ref);
    const row = {
      id,
      created_at: dt,
      updated_at: dt,
      user_id: user.id,
      created_by: user.id,
      updated_by: user.id,
      post_ref,
      title,
      content,
      tags,
    };
    const { result, error } = await db.insertOne(TBL_POST, row);
    return { data: 0 < result.rowCount ? id : null, error };
  }

  async function post_retrieve({ user, id, input }) {
    // TODO: validate uuid
    // TODO: analytics of 'views' per record per visitor per day
    const { row: data, error } = await db.findOne(TBL_POST, 'id', id);
    return { data, error };
  }

  async function post_update({ user, id, input }) {
    let error = null;

    let { post_ref, title, content, tags } = input;
    const dt = new Date();

    const { row: postFound, error: findPostErr } = await db.findOne(TBL_POST, 'id', id);
    if (findPostErr) throw findPostErr;
    if (!postFound) throw new ErrNotFound('post not found');
    if (postFound.user_id !== user.id) throw new ErrForbidden(); // TODO: we can use created_at

    if (!title) title = 'my post at ' + dt.toISOString();
    if (!post_ref) post_ref = title;
    post_ref = makePostRef(post_ref);
    let change = { post_ref, title, content, tags, updated_at: dt, updated_by: user.id, };
    let { result, error: updatePostError } = await db.update(TBL_POST, { id }, change);
    if (updatePostError) throw updatePostError;

    return { data: result && result.rowCount, error };
  }

  async function post_search({ user, input }) {
    let data = [], error = null;
    let { q = '', offset = 0, limit = 10 } = input;
    if (100 < limit) limit = 100;
    const text = 'SELECT p.*, u.username FROM ' + TBL_POST + ' p'
      + ' INNER JOIN ' + TBL_USER + ' u ON p.user_id = u.id'
      + ' WHERE (p.title LIKE $1)'
      + '    OR (p.content LIKE $1)'
      + '    OR (p.tags LIKE $1)'
      + ' ORDER BY p.created_at DESC' // TODO: ranking, relevance
      + ' OFFSET $2'
      + ' LIMIT $3';
    const { result, error: findError } = await db.query(text, [`%${q}%`, offset, limit], 'posts-text-search');
    if (findError) throw findError;
    data = result && result.rows ? result.rows : [];
    return { data, error };
  }

  async function post_search_by_username({ input = {} }) {
    let data = [], error = null;
    let { user_id = null, username = null, q = '', offset = 0, limit = 10 } = input;

    if (!user_id && username) {
      const { row: postOwner, error: userError } = await db.findOne(TBL_USER, 'username', username);
      if (userError) throw userError;
      if (!postOwner) throw new ErrNotFound('user not found');
      user_id = postOwner.id;
    }
    if (!user_id) throw ErrBadRequest('user_id or username is required');

    if (100 < limit) limit = 100;
    const text = 'SELECT p.id, p.post_ref, p.title, p.tags FROM ' + TBL_POST + ' p'
      + ' WHERE p.user_id = $1'
      + ' ORDER BY p.created_at DESC'
      + ' OFFSET $2'
      + ' LIMIT $3';
    const { result, error: findError } = await db.query(text, [user_id, offset, limit], 'posts-by-user');
    if (findError) throw findError;
    data = result && result.rows ? result.rows : [];
    return { data, error };
  }

  // use retrieve_post(), it is faster
  async function post_retrieve_by_username_and_post_ref({ user, input = {} }) {
    let data = null, error = null;
    let { username = '', post_ref = '' } = input;
    username = username.toLowerCase();
    post_ref = post_ref.toLowerCase();
    const { row: postOwner, error: userError } = await db.findOne(TBL_USER, 'username', username);
    if (userError) throw userError;
    if (!postOwner) throw new ErrNotFound('user not found');

    const text = 'SELECT * FROM ' + TBL_POST
      + ' WHERE (user_id = $1) AND (post_ref = $2)';
    const { result, error: postError } = await db.query(text, [postOwner.id, post_ref], 'post-by-user-and-ref');
    if (postError) throw postError;
    if (result && result.rows && result.rows[0]) {
      // TODO: analytics of 'views' per record per visitor per day
      data = result.rows[0];
    } else {
      throw new ErrNotFound('post not found');
    }
    return { data, error };
  }

  const actionsProtected = [
    'signout',
    'user_retrieve_current',
    'usercontact_update',
    'usercontact_update_self',
    'usergeo_update',
    'usergeo_update_self',
    'post_create', 'post_update',
  ];
  const actionsForUser = [
    'usergeo_update',
    'usercontact_update',
  ];
  const actionsForSelf = [
    'usergeo_update_self',
    'usercontact_update_self',
  ];
  const actionsForOwners = ['post_update'];

  function _isAllowed({ action = '', user, id, input, rowFound }) {
    let protect = false;
    if (actionsProtected.includes(action)) {
      protect = true;
      if (!user) throw new ErrUnauthorized(); // early decision
    }
    if (protect && actionsForUser.includes(action)) { // extra check
      if (user.id !== id) throw new ErrForbidden();
    }
    if (protect && actionsForSelf.includes(action)) { // extra check
      if (!user) throw new ErrForbidden();
    }
    if (protect && actionsForOwners.includes(action) && rowFound) { // extra check
      if (user.id !== rowFound.created_by) throw new ErrForbidden();
    }
    return !protect;
  }

  return {
    _isAllowed,

    signup,
    signin,
    user_retrieve_current,

    user_search,
    user_retrieve,
    usergeo_update,
    usergeo_update_self,
    usercontact_update,
    usercontact_update_self,

    post_create,
    post_search,
    post_search_by_username,
    post_retrieve,
    post_retrieve_by_username_and_post_ref,
    post_update,
  };
}

/**
 * Remove all chars but a-z, A-Z, 0-9, '.', '-', '_'
 * @param {string} username
 * @returns {string}
 */
export function pruneUsername(username) {
  const pattern = /[^a-zA-Z0-9.\-_]+/i;
  return String(username).replace(pattern, '');
}

export const specialChars = '.,-_<>?!@$;:()&%+-*/\\';

/**
 * Check whether input has one special character or not
 * @param {string} testString
 * @returns {boolean}
 */
export function hasOneSpecialChar(testString) {
  const chars = specialChars.split(''); // convert to char array
  const escapedChars = chars.map(c => ('\\'+c)); // add escape before each char
  const pattern = escapedChars.join('|'); // join by pipe so the test will look for one of the sub-patterns
  const re = new RegExp(pattern);
  return re.exec(testString) !== null;
}

/**
 * Check password
 * 1. has length over 9
 * 2. has 1 of a-z
 * 3. has 1 of A-Z
 * 4. has 1 of 0-9
 * 5. has 1 of special characters
 * @param {string} password
 * @returns {boolean}
 */
export function isStrongPassword(password) {
  let s = String(password);
  return 10 <= s.length
    && s.match(/[a-z]/)
    && s.match(/[A-Z]/)
    && s.match(/[0-9]/)
    && hasOneSpecialChar(s);
}

/**
 * Create hash for plain password
 * @param {string} plainPassword
 * @param {number} saltRounds
 * @returns {Promise<string>}
 */
export async function hashPassword(plainPassword, saltRounds = 10) {
  // store hash in your db
  return bcrypt.hash(plainPassword, saltRounds);
}

/**
 * Verify password
 * @param {string} plainPassword
 * @param {string} password_hash
 * @returns {Promise<Boolean>}
 */
export async function verifyPassword(plainPassword, password_hash) {
  // result == true/false
  return bcrypt.compare(plainPassword, password_hash);
}

export function hideSensitiveUserProps(row) {
  delete row.password_hash;
  return row;
}

export class ErrBadRequest extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.name = this.constructor.name;
    //this.statusCode = 400;
  }
}

export class ErrUnauthorized extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = this.constructor.name;
    //this.statusCode = 401;
  }
}

export class ErrForbidden extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = this.constructor.name;
    //this.statusCode = 403;
  }
}

export class ErrNotFound extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 404;
  }
}

export function serializeFbCookie(userSecret) {
  return cookie.serialize(FB_SECRET_COOKIE, userSecret, {
    sameSite: 'lax',
    secure: IS_PROD,
    maxAge: 72576000,
    httpOnly: true,
    path: '/',
  });
}

export function parseFbCookie(cookieStr) {
  const cookies = cookie.parse(cookieStr);
  return cookies[FB_SECRET_COOKIE] || null;
}
