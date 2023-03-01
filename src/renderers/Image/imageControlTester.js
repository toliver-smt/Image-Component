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
if (schema.hasOwnProperty('customRender') && schema.customRender == 'image') {
        var cellschema = schema;
        return cellschema['customRender'] === 'image';
      }
      return false;
    })
  )
);

