import { toPascalCase } from "../../utils.script";

export default (name: string) => {
  const pascalName = toPascalCase(name);

  return `import { ${pascalName}Model } from "./${name}.model";
import { I${pascalName} } from "./${name}.typing";

export const ${pascalName}Service = {
  create: async (body: I${pascalName}) => {
    const created${pascalName} = await ${pascalName}Model.create(body);
    return created${pascalName};
  },

  readAll: async () => {
    const ${name}s = await ${pascalName}Model.find({});
    return ${name}s;
  },

  read: async (id: string) => {
    const ${name} = await ${pascalName}Model.findById(id);
    return ${name};
  },

  update: async (id: string, body: Partial<I${pascalName}>) => {
    const updated${pascalName} = await ${pascalName}Model.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updated${pascalName};
  },

  delete: async (id: string) => {
    const deleted${pascalName} = await ${pascalName}Model.findByIdAndDelete(id);
    return deleted${pascalName};
  },
};
  `;
};
