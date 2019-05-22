import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

class SimpleDialog extends React.Component {
    state = {
        password: ''
    }

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleCheck = () => {
        let writer = this.props.writer;
        let password = this.state.password;
        let _id = this.props._id;

        this.props.onCheck(writer, password, _id);
    };
    
    handleChange = (e) => {
        this.setState({
            password : e.target.value
        });
    }

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="form-dialog-title">Password Ckeck</DialogTitle>
                <DialogContent>
                    <TextField
                        disabled
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        value={other.writer}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCheck} color="primary">
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    onCheck: PropTypes.func,
    selectedValue: PropTypes.string,
};

SimpleDialog.defaultProps = {

    onCheck: (writer, password, _id) => {
        console.error('onCheck function not defined');
    },
    
}

export default SimpleDialog;
