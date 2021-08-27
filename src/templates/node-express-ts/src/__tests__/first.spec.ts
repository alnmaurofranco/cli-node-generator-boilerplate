import '@config/env'

import { PORT } from '@config/index'

describe('First', () => {
  it('should', () => {
    expect("3333").toBe(PORT);
  });
})
