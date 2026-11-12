import globals from 'globals';
export default [
  { ignores: ['dist/**','node_modules/**','coverage/**'] },
  { files: ['**/*.{js,jsx,mjs}'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: {...globals.browser,...globals.node}, parserOptions: {ecmaFeatures:{jsx:true}} }, rules: {'no-unused-vars':['error',{argsIgnorePattern:'^_',varsIgnorePattern:'^_'}]} },
  { files: ['**/*.jsx'], rules: {'no-unused-vars':'off'} }
];
