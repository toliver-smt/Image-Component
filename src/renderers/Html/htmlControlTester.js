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
    schemaTypeIs('string'),
    schemaMatches(schema => {
if (schema.hasOwnProperty('customRender') && schema.customRender == 'html') {
        var cellschema = schema;
        return cellschema['customRender'] === 'html';
      }
      return false;
    })
  )
);

