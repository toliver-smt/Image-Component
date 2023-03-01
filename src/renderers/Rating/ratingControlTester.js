import {
  rankWith,
  uiTypeIs,
  schemaMatches,
  schemaTypeIs,
  scopeEndsWith,
  and
} from '@jsonforms/core';

export default rankWith(
  100,
  and(
    uiTypeIs('Control'),
    schemaTypeIs('number'),
    schemaMatches(schema => {
if (schema.hasOwnProperty('customRender') && schema.customRender == 'rating') {
        var cellschema = schema;
        return cellschema['customRender'] === 'rating';
      }
      return false;
    })
  )
);

