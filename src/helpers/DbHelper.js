import {openDatabase} from 'react-native-sqlite-storage';
import {
  TABLE_PRODUCTS,
  PRODUCT_ID,
  PRODUCT_NAME,
  PRODUCT_CATEGORY_ID,
  PRODUCT_PRICE,
  TABLE_CATEGORIES,
  CATEGORY_ID,
  CATEGORY_NAME,
} from './DbConstants';
var db = openDatabase(
  {name: 'products.db'},
  success => {
    console.log('success', success);
  },
  error => {
    console.log('error', error);
  },
);

export function initDbHelper() {
  db.transaction(function(txn) {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_PRODUCTS}(${PRODUCT_ID} INTEGER PRIMARY KEY AUTOINCREMENT, ${PRODUCT_NAME} VARCHAR(20), ${PRODUCT_CATEGORY_ID} INT(10), ${PRODUCT_PRICE} VARCHAR(255))`,
      [],
      resultset => {
        console.log('resultset proucts', resultset);
      },
      error => {
        console.log('error proucts', error);
      },
    );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_CATEGORIES}(${CATEGORY_ID} INTEGER PRIMARY KEY AUTOINCREMENT, ${CATEGORY_NAME} VARCHAR(255))`,
      [],
      resultset => {
        console.log('resultset categories', resultset);

        txn.executeSql(
          `INSERT INTO ${TABLE_CATEGORIES} (${CATEGORY_NAME}) VALUES (?)`,
          ['Clothes'],
          result => {
            console.log('result', result);
          },
          error => {
            console.log('error', error);
          },
        );
        txn.executeSql(
          `INSERT INTO ${TABLE_CATEGORIES} (${CATEGORY_NAME}) VALUES (?)`,
          ['Electronics'],
          result => {
            console.log('result', result);
          },
          error => {
            console.log('error', error);
          },
        );
        txn.executeSql(
          `INSERT INTO ${TABLE_CATEGORIES} (${CATEGORY_NAME}) VALUES (?)`,
          ['Beauty'],
          result => {
            console.log('result', result);
          },
          error => {
            console.log('error', error);
          },
        );
      },
      error => {
        console.log('error', error);
      },
    );
  });
}
