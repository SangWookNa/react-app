import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    button: {
        margin: theme.spacing.unit,
        float: 'right'
    },
    input: {
        display: 'none',
    },
});

class VideoUpload extends React.Component {
    state = {
        searchValue: ''
    }

    handleInputChange = (e) => {
        this.setState({
            searchValue: e.target.value,
        });
    }

    handleSearch = () => {
        window.infowindow.close();

        // 장소 검색 객체를 생성합니다
        var ps = new window.kakao.maps.services.Places();

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(this.state.searchValue, placesSearchCB);

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === window.kakao.maps.services.Status.OK) {

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new window.kakao.maps.LatLngBounds();
  
                for (var i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
                }

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                window.map.setBounds(bounds);
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {

                alert('검색 결과가 존재하지 않습니다.');
                return;
        
            } else if (status === window.kakao.maps.services.Status.ERROR) {
        
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
        
            }
        }
        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
            console.log(place);
            var marker = new window.kakao.maps.Marker();

            // 마커를 생성하고 지도에 표시합니다
            marker = new window.kakao.maps.Marker({
                map: window.map,
                position: new window.kakao.maps.LatLng(place.y, place.x)
            });

            window.markers.push(marker);

            // 마커에 클릭이벤트를 등록합니다
            window.kakao.maps.event.addListener(marker, 'click', function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                window.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                window.infowindow.open(window.map, marker);
            });
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {

            for ( var i = 0; i < window.markers.length; i++ ) {
                window.markers[i].setMap(null);
            }   
            window.markers = [];
        }

    }

    render() {
        const { classes } = this.props;

        return (
            <div style={{ marginTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                    <TextField
                        id="searchValue"
                        name="searchValue"
                        label="예식장 주소를 입력하세요"
                        style={{ width: '75%' }}
                        value={this.state.searchValue}
                        variant="outlined"
                        onChange={this.handleInputChange}
                    />
                    <Button variant="contained" onClick={this.handleSearch} color="primary" className={classes.button} size="small" component="span" >
                        search
                    </Button>
                </div>
                <div id="map" style={{ width: '100%', height: '300px', margin: 'auto', backgroundColor: 'gray' }}></div>
                
            </div>
        );
    }
}

export default withStyles(styles)(VideoUpload);