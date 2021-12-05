import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

let YAML_CONFIG_FILENAME = 'development.yaml';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
