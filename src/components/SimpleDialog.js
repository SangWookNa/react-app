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
        this.setState({
            password: ''
        });
        this.props.onClose();
    };

    handleCheck = () => {

        let password = this.state.password;
        let _id = this.props._id;
        let selectedValue = this.props.selectedValue;

        this.props.onCheck(password, _id, selectedValue);
    };

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="form-dialog-title">{selectedValue}</DialogTitle>
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
                    <Button onClick={this.handleClose} color="primary">
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

SimpleDialog.defaultProps = {


}

export default SimpleDialog;
