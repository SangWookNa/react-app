import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
//import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    input1: {
        height: 15
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),

    },
    dense: {
        marginTop: 1,
    },
    
});

class Write extends React.Component {
    state = {
        contents: '',
        username: '',
        password: '',
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;

        this.setState(
            nextState
        );
    }

    handlePost = () => {

        let contents = this.state.contents;
        let username = this.state.username;
        let password = this.state.password;

        this.props.onPost(username, password, contents)
            .then(
                (result) => {
                    console.log(result);
                    if (result.status === "SUCCESS") {
                        this.setState({
                            username: "",
                            password: "", 
                            contents: ""
                        });
                    }
                }
            )
    }



    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="username"
                            name="username"
                            label="name"
                            fullWidth
                            InputProps={{ classes: { input: classes.input1 } }}
                            margin="normal"
                            value={this.state.username}
                            
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="password"
                            name="password"
                            label="password"
                            type="password"
                            fullWidth
                            InputProps={{ classes: { input: classes.input1 } }}
                            autoComplete="current-password"
                            margin="normal"
                            value={this.state.password}
                            
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="contents"
                            name="contents"
                            label={<Typography color="inherit" >축하 메세지를 남겨주세요!</Typography>}
                            maxRows="4"
                            multiline
                            fullWidth
                            margin="dense"
                            value={this.state.contents}
                            //className={classNames(classes.dense, classes.font)}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid container alignItems="flex-end" item xs={3}>
                        <Button size="small" variant="contained" color="primary" className={classes.button}
                            onClick={this.handlePost}>
                            등록
                    </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); }
}

export default withStyles(styles)(Write);