import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import strings from '../resources/strings';
import colors from '../resources/colors';
import icons from '../resources/icons';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'ProductManage.db'});
class ProductListingScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      filterItems: [
        {label: 'By Name A to Z', value: 'name'},
        {label: 'By Price Low to High', value: 'price'},
        {label: 'By Category', value: 'category'},
      ],
    };
  }
  componentDidMount() {
    this.doGetProducts();
  }
  doGetProducts = () => {
    db.transaction(function(tx) {
      tx.executeSql(
        'SELECT P.id,P.name,P.price,C.name as category FROM ProductMaster as P INNER JOIN CategoryMaster as C ON P.category=C.id',
        [],
        (tx, results) => {
          console.log('Query completed');
          var len = results.rows.length;
          let products = [];
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            const {id, name, price, category} = row;
            products.push({
              id: id,
              name: name,
              price: price,
              category: category,
            });
          }
          this.setState({productList: products});
        },
      );
    });
  };
  renderProductItem = (item, index) => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 4,
          elevation: 2,
          padding: 10,
          marginBottom: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: colors.colorHeaderBackground,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {strings.HINT_NAME} :
          </Text>
          <Text
            style={{
              color: colors.colorHeaderBackground,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {' '}
            {item.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 16}}>{strings.HINT_PRICE} :</Text>
          <Text style={{fontSize: 16}}> {item.price}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 16}}>{strings.HINT_CATEGORY} :</Text>
          <Text style={{fontSize: 16}}> {item.category}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={styles.textHeader}>
            {strings.HEADER_PRODUCT_LISTING}
          </Text>
          <TouchableOpacity>
            <Image source={icons.filter} style={styles.imgFilter} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.productList}
            renderItem={({item, index}) => this.renderProductItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colorBackground,
    flex: 1,
  },
  viewHeader: {
    backgroundColor: colors.colorHeaderBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {padding: 10, color: colors.white, flex: 1, fontSize: 20},
  imgFilter: {
    width: 24,
    height: 24,
    tintColor: colors.white,
    marginEnd: 10,
  },
});
export default ProductListingScreen;
