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
    schemaTypeIs('array'),
    schemaMatches(schema => {
      if (schema.hasOwnProperty('customRender') && schema.customRender == 'grid') {
        var cellschema = schema;
        return cellschema['customRender'] === 'grid';
      }
      return false;
    })
  )
);

