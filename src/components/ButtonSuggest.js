import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import Theme from '../Theme/Color';

class ButtonSuggest extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
              <Text style={styles.textButton}>{this.props.provider}</Text>
              <Text style={styles.textButton}>{`₫${this.props.price}`}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5
    },
    textButton: {
        color: "#333",
        fontSize: 12,
        textTransform: "uppercase"
    }
});

export default ButtonSuggest;