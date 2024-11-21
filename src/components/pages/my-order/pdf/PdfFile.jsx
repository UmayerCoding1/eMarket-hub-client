import React from "react";
import ReactPDF, {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { logo } from "../../../../provider/ImageProvider";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 10,
      padding: 20,
    },
    section: {
      marginBottom: 10,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableColHeader: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      backgroundColor: '#f2f2f2',
      padding: 5,
      fontWeight: 'bold',
    },
    tableCol: {
      width: '20%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      padding: 5,
    },
    bold: {
      fontWeight: 'bold',
    },
    link:{
        color:"red"
    }
  });
const PdfFile = ({ invoice ,allItem,userInfo}) => {
   const sunTotal = allItem.reduce((total, item) => total + item.totalPrice, 0);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.section}>
        <Image style={{width: '100px'}} src={logo}/>
        <Text>Happy shopping</Text>
      </View>
      
      {/* Order Info */}
      <View style={styles.section}>
        <Text> Invoice Date: {invoice}</Text>
      </View>
      
      {/* Billing Info */}
      <View style={{borderBottom: '1px solid #b5b3b3', marginBottom: '5px'}}>
        <Text  style={{fontWeight:'bold'}}>Bill From</Text>
        <Text>eMarket Hub</Text>
        <Text>094884016778</Text>
        <Text>D/15-1, Road-36, Block-D,Chattogram</Text>
        <Text>BIN Number: 004687255-0202</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.bold}>Billed To</Text>
        <Text>{userInfo?.displayName }</Text>
        <Text>{userInfo?.email }</Text>
        <Text>Address: *******</Text>
      </View>
      
      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>SL No.</Text>
          <Text style={styles.tableColHeader}>Product name</Text>
          <Text style={styles.tableColHeader}>Quantity</Text>
          <Text style={styles.tableColHeader}>Amount</Text>
        </View>
        {/* Sample Data Rows */}
        {allItem.map((product,i) => {
            return([
                 <View key={i} style={styles.tableRow}>
          <Text style={styles.tableCol}>{i+1}</Text>
          <Text style={styles.tableCol}>{product.product_name}</Text>
          <Text style={styles.tableCol}>{product.quantity}</Text>
          <Text style={styles.tableCol}>{product.totalPrice}</Text>
        </View>
            ])
        })}
       

      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text>Subtotal: {sunTotal}</Text>
      </View>
    </Page>
    </Document>
  );
};

// ReactPDF.render(<PdfFile/>)
export default PdfFile;
