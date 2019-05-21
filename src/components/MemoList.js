import React from 'react';
import Grid from '@material-ui/core/Grid';
import Memo from './Memo';


class MemoList extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }
    render() {
        console.log('MemoList render method executed');
        const mapToComponents = (data) => {
            return data.map((memo, i) => {
                return (<Memo
                    data={memo}                   
                    key={memo._id}
                    onRemove={this.props.onRemove}
                    index={i}                   
                />);
            });
        };

        return (
            <Grid container spacing={8}>
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
};

export default MemoList;