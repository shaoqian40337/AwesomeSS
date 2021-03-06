import React from 'react';

import { auth } from '../firebase';
import Button from '@material-ui/core/Button';

const SignOutButton = () =>
  <Button color="inherit" onClick={auth.doSignOut}>Sign Out</Button>

export default SignOutButton;