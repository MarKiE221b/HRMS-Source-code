import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../assets/ched-logo.png";
import checkmark from "../../assets/checkmark.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  topform_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  topform: {
    fontSize: 9,
    fontWeight: 700,
  },
  header_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "30px",
  },
  image_container: {
    height: 40,
    width: 40,
    marginLeft: "45px",
  },
  header_innerContainer: {
    flex: 1,
    textAlign: "center",
    alignItems: "center", // Ensure items are centere
  },
  header_text: {
    fontSize: 10,
  },
  stamp_container: {
    height: 20,
    display: "flex",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#bcbcbc",
    fontSize: 7,
    padding: 5,
  },

  title_container: {
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: 16,
  },

  body_container: {
    borderWidth: "1px",
    borderStyle: "solid",
  },

  outerName_container: {
    flexDirection: "column",
    paddingTop: "5px",
    paddingBottom: "15px",
    paddingLeft: "1px",
    borderBottom: "1px",
    borderStyle: "solid",
  },

  nameInput_container: {
    fontSize: 10,
    flexDirection: "row",
    textTransform: "uppercase",
    marginTop: "5px",
    marginLeft: "60px",
  },

  name_container: {
    fontSize: 8,
    flexDirection: "row",
  },

  text_parenthesis: {
    marginRight: "70px",
  },

  text_department: {
    marginRight: "80px",
  },

  text_name: {
    marginRight: "30px",
  },
  // checkboxContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 10,
  // },
  // checkbox: {
  //   width: 12,
  //   height: 12,
  //   borderWidth: 1,
  //   borderColor: "#000",
  //   marginRight: 5,
  //   position: "relative",
  // },
  // checkmark: {
  //   position: "absolute",
  //   width: 9,
  //   height: 9,
  // },
});

const Checkbox = ({ label, checked }) => (
  <View style={styles.checkboxContainer}>
    <View style={styles.checkbox}>
      {checked && <Image src={checkmark} style={styles.checkmark} />}
    </View>
    <Text>{label}</Text>
  </View>
);

const LeaveForm = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.topform_container}>
        <View>
          <Text style={styles.topform}>Civil Service Form No. 6</Text>
          <Text style={styles.topform}>Revised 2020</Text>
        </View>
      </View>

      <View style={styles.header_container}>
        <View style={styles.image_container}>
          <Image src={logo} />
        </View>
        <View style={styles.header_innerContainer}>
          <Text style={styles.header_text}>Republic of the Philippines</Text>
          <Text style={[styles.header_text, styles.italic]}>
            COMMISSION ON HIGHER EDUCATION
          </Text>
          <Text style={styles.header_text}>Hayes St., Cagayan de Oro City</Text>
        </View>
        <View style={styles.stamp_container}>
          <Text>Stamp of Date Receipt</Text>
        </View>
      </View>

      <View style={styles.title_container}>
        <Text>APPLICATION FOR LEAVE</Text>
      </View>

      <View style={styles.body_container}>
        <View style={styles.outerName_container}>
          <View style={styles.name_container}>
            <Text style={styles.text_department}>1. OFFICE/DEPARTMENT</Text>
            <Text style={styles.text_name}>2. NAME : </Text>
            <Text style={styles.text_parenthesis}>(Last)</Text>
            <Text style={styles.text_parenthesis}>(First)</Text>
            <Text>(Middle)</Text>
          </View>
          <View style={styles.nameInput_container}>
            <Text style={{ marginRight: "110px" }}>Records</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingRight: "10px",
              }}
            >
              <Text>Test</Text>
              <Text>Test</Text>
              <Text>Test</Text>
            </View>
          </View>
        </View>

        <View>
          <Text>Test</Text>
        </View>
      </View>

      {/* <Checkbox label="Option 1" checked={true} />
      <Checkbox label="Option 2" checked={false} /> */}
    </Page>
  </Document>
);

export default LeaveForm;
