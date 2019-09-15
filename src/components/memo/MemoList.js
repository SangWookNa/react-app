import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Memo from './Memo';

const styles = {
    root: {
        flexGrow: 1,
        //backgroundColor: '#F0F8FF'
    }
};

class MemoList extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }
    render() {
        const { classes } = this.props

        const mapToComponents = (data) => {
            return data.map((memo, i) => {
                return (<Memo
                    data={memo}
                    key={memo._id}
                    onRemove={this.props.onRemove}
                    onEdit={this.props.onEdit}
                    onCheck={this.props.onCheck}                    
                    index={i}
                />);
            });
        };

        return (
            <Grid className={classes.root} container spacing={8}>
                {mapToComponents(this.props.data)}
            </Grid>

        );
    }
}

MemoList.defaultProps = {
    data: [],
    onRemove: (id, index) => {
        console.error('remove function not defined');
    },
    onCheck: (password, _id, selectedValue) => {
        console.error('password check function not defined');
    },
    onEdit: (_id, contents) => {
        console.error('onEdit check function not defined');
    },
};

export default withStyles(styles)(MemoList);