import { graphql, parse, validate, execute, specifiedRules, Source } from 'graphql';
import { newConfig, newMongo, newGraphql } from '../../serverLib';

async function handler(req, res) {
  try {
    const config = newConfig(process.env);
    const { db } = await newMongo({ config });
    const { schema, rootValue } = newGraphql({ config, db });

    const { query, variables, operationName } = req.body;

    /*
    const document = parse(new Source(query, 'GraphQL request')); // AST
    const rules = [ ...specifiedRules ];
    const validationErrors = validate(schema, document, rules);
    let result = { data: null, errors: [] };
    if (validationErrors.length > 0) {
      // no need to execute GQL query
    } else {
      result = await execute({
        schema,
        document,
        rootValue,
        contextValue: { db },
        variableValues: variables,
        operationName,
        // fieldResolver,
        // typeResolver,
      });
    }*/

    const result = await graphql(schema, query);

    //res.status(200).json({ ts: new Date(), status: 'ok', ...result, errors: validationErrors });
    res.status(200).json({ ts: new Date(), status: 'ok', ...result });
  } catch (err) {
    res.status(500).json({ ts: new Date(), status: err.message });
  }
}

export default handler;
