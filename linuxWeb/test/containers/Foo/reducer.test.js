import { expect } from 'chai';
import foo from 'containers/Foo/reducer';
import * as at from 'constants/actionTypes';
import immutable from 'immutable';

describe('foo reducer', () => {
  it('should change name correctly', () => {
    const result = foo(immutable.fromJS({}), {
      type: at.CHANGE_NAME,
      name: 'bar',
    });
    expect(result.get('name')).to.be.equal('bar');
  });
});
