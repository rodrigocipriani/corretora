import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  linkHeader: {
    flex: 1,
    color: '#ffffff',
    textDecoration: 'none'
  }
};

const Header = ({ auth, classes }) => {
  const authButton = auth ? (
    <a className={classes.linkHeader} href="/api/logout">
      <Button color="contrast">
        Logout
      </Button>
    </a>
  ) : (
    <a className={classes.linkHeader} href="/api/auth/google">
      <Button color="contrast">
        Login
      </Button>
    </a>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.linkHeader}>
            <Typography type="title" color="inherit" className={classes.flex}>
              Corretora
            </Typography>
          </Link>
          <Link to="/users" className={classes.linkHeader}>
            <Button color="contrast">Users</Button>
          </Link>
          <Link to="/admins" className={classes.linkHeader}>
            <Button color="contrast">
              Admins
            </Button>
          </Link>
          {authButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Header));
