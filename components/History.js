import React,{Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import { connect } from 'react-redux';
import { fetchCalendarResults } from '../utils/api';
import { receiveEntries, addEntry } from '../store/actions';
import { timeToString, getDailyReminderValue } from '../utils/helper';
import UdacifitnessCalendar from 'udacifitness-calendar-fix';
import DateHeader from './DateHeader';
import { white } from '../utils/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MetricCard from './MetricCard';
import {AppLoading} from 'expo'

class History extends Component {
    state={
        ready: false
    }

    componentDidMount(){
        const {dispatch} = this.props
        fetchCalendarResults()
            .then((entries)=> dispatch(receiveEntries(entries)))
            .then(({entries})=>{
                if(!entries[timeToString()]){
                    dispatch(addEntry({
                        [timeToString()]:getDailyReminderValue()
                    }))
                }
            })
            // .then(()=>({
            //     ready: true
            // }))
    }

    renderItem = ({today, ...metrics}, formattedDate, key) =>(
        <View style={styles.item}>
            {today
                ? <View>
                    <DateHeader date={formattedDate} />
                    <Text style={styles.noDataText}>
                        {today}
                    </Text>
                </View>
                : <TouchableOpacity onPress={()=>Console.log("press")}>
                    <MetricCard metrics={metrics} date={formattedDate} />
                </TouchableOpacity> }
        </View>
    )

    renderEmptyDate = (formattedDate) => {
        return(
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                    You did not log any data on this day
                </Text>
            </View>
        )
    }


    render(){
        const {entries} = this.props;
        const {ready} = this.state;
        if(ready === true) {
            return <AppLoading />
        }

        return(

            <UdacifitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />

        )
    }
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity:0.3,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
            width:0,
            height: 3,
        },
    },
    noDataText:{
        fontSize:20,
        paddingTop: 20,
        paddingBottom: 20
    }
})

const mapStateToProps = (entries) =>{
    return{
        entries
    }
}

export default connect(mapStateToProps)(History);