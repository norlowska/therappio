import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Button, Text } from "native-base";

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: this.props.options[0]
    };

    this.updateActiveOption = this.updateActiveOption.bind(this);
  }

  updateActiveOption(activeOption) {
    // this.props.onChange(activeOption);
    this.setState({
      activeOption
    });
  }

  render() {
    const { options } = this.props;

    return (
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap"
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
              marginRight: 5,
              marginTop: 10,
              backgroundColor:
                this.state.activeOption === option ? this.props.color : "#fff",
              borderColor: this.props.color,
              borderRadius: 10
            }}
          >
            <Text
              style={{
                color:
                  this.state.activeOption === option ? "#fff" : this.props.color
              }}
            >
              {option}
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
  onChange: PropTypes.func.isRequired
};
