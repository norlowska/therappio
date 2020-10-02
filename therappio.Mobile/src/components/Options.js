import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text } from 'native-base';

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: this.props.options[0],
    };

    this.updateActiveOption = this.updateActiveOption.bind(this);
  }

  updateActiveOption(activeOption) {
    // this.props.onChange(activeOption);
    this.setState({
      activeOption,
    });
    this.props.onChange(activeOption);
  }

  render() {
    const { options } = this.props;

    return (
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {options.map((option, index) => (
          <Button
            bordered
            small
            key={index}
            onPress={() => {
              this.updateActiveOption(option);
            }}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              marginRight: 5,
              marginTop: 10,
              backgroundColor: this.state.activeOption === option ? this.props.color : '#fff',
              borderColor: this.props.color,
              elevation: 5,
              borderRadius: 10,
              shadowColor: '#000',
              shadowRadius: 3.84,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
            }}
          >
            <Text
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                color: this.state.activeOption === option ? '#fff' : this.props.color,
                textShadowColor: '#7a7a7a',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              {` `}
              {option}
              {` `}
            </Text>
          </Button>
        ))}
      </View>
    );
  }
}

Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
