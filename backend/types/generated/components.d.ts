import type { Schema, Struct } from '@strapi/strapi';

export interface YeahKvnks extends Struct.ComponentSchema {
  collectionName: 'components_yeah_kvnks';
  info: {
    displayName: 'kvnks';
    icon: 'train';
  };
  attributes: {
    ht: Schema.Attribute.String;
    sf: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'yeah.kvnks': YeahKvnks;
    }
  }
}
