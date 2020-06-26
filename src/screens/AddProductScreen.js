import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';
import strings from '../resources/strings';
import colors from '../resources/colors';
import Reinput from 'reinput';
import errors from '../resources/errors';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import {Dropdown} from '../components/dropdown/index';
import {initDbHelper} from '../helpers/DbHelper';

class AddProductScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      errName: undefined,
      errPrice: undefined,
      errSelectCategory: undefined,
      categories: [
        {
          value: 1,
          label: 'Clothes',
        },
        {
          value: 2,
          label: 'Electronics',
        },
        {
          value: 3,
          label: 'Beauty',
        },
      ],
      selectedCategoryId: 1,
      selectedCategoryName: 'Clothes',
    };
  }

  onChangeText = (value, index, data) => {
    this.setState({
      selectedCategoryId: value,
      selectedCategoryName: data[index].label,
    });
  };
  doClickSave = () => {
    const {name, price, selectedCategoryId, selectedCategoryName} = this.state;
    if (name.trim() === '') {
      this.nameInput.focus();
      showMessage({
        message: errors.ENTER_NAME,
        type: 'danger',
      });
      return;
    }
    if (price.trim() === '') {
      this.priceInput.focus();
      showMessage({
        message: errors.ENTER_PRICE,
        type: 'danger',
      });
      return;
    }
    if (selectedCategoryName.trim() === '') {
      showMessage({
        message: errors.SELECT_CATEGORY,
        type: 'danger',
      });
      return;
    }
  };
  componentDidMount() {
    initDbHelper();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 10,
              color: '#FF4081',
            }}>
            {strings.HEADER_ADD_PRODUCT}
          </Text>
          <View style={{marginStart: 10, marginEnd: 10}}>
            <Reinput
              ref={input => (this.nameInput = input)}
              label={strings.HINT_NAME}
              value={this.state.name}
              onChangeText={text => {
                this.setState({name: text}, () => {
                  this.state.name.trim() === ''
                    ? this.setState({
                        errName: errors.ENTER_NAME,
                      })
                    : this.setState({errName: undefined});
                });
              }}
              error={this.state.errName}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.state.name.length > 0
                  ? this.setState({errName: undefined})
                  : this.priceInput.focus();
              }}
            />
            <Reinput
              ref={input => (this.priceInput = input)}
              label={strings.HINT_PRICE}
              value={this.state.price}
              onChangeText={text => {
                this.setState({price: text}, () => {
                  this.state.price.trim() === ''
                    ? this.setState({
                        errPrice: errors.ENTER_PRICE,
                      })
                    : this.setState({errPrice: undefined});
                });
              }}
              error={this.state.errPrice}
              returnKeyType="done"
              keyboardType="numeric"
              maxLength={7}
              onSubmitEditing={() => {
                this.state.price.length > 0
                  ? this.setState({errPrice: undefined})
                  : this.priceInput.focus();
              }}
            />
            <View style={{marginBottom: 20, marginTop: 20}}>
              <Dropdown
                label={strings.HINT_SELECT_CATEGORY}
                data={this.state.categories}
                value={this.state.selectedCategoryName}
                onChangeText={this.onChangeText}
                error={this.state.errSelectCategory}
                valueExtractor={({value}) => value}
                labelExtractor={({label}) => label}
              />
            </View>
            <Button
              title={strings.BTN_SAVE}
              onPress={this.doClickSave.bind(this)}
            />
          </View>
          <FlashMessage position="bottom" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colorBackground,
    flex: 1,
  },
});

export default AddProductScreen;
