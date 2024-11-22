import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { FunctionComponent } from "react";
import { formatDateForPdf } from './dateFixation';

const mininterInfo = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20
  },
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '10 10',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const audience = StyleSheet.create({
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: .5,
    borderCollapse: 'collapse',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  rowhead: {
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 10
  },
  cell: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: .5,
    padding: 5,
  },
  total: {
    fontSize: 7,
    marginTop: 5,
  },
  signature: {
    fontSize: 12,
    textAlign: 'right',
    marginRight: 5,
    marginTop: 15,
    marginBottom: 100,
  },
  date: {
    fontSize: 12,
    textAlign: 'right',
    marginRight: 105,
    marginVertical: 5
  }
});

interface PdfProps {
  audiences: any[];
  total: any;
  audience_status: any;
  date_debut: any;
  date_end: any;
}

const GeneratePdf: FunctionComponent<PdfProps> = ({ audiences, total, audience_status, date_debut, date_end }) => {
  console.log("kindy eh", String(audience_status).toUpperCase())
  
  return (
    <div className="bg-gray-500">
            <PDFViewer width="100%" height="500">
            <Document>
              <Page size="A4" style={mininterInfo.page}>
                <View style={mininterInfo.section}>
                  <Text style={mininterInfo.header}>MINISTERE DE L'INTERIEUR</Text>
                  <Text style={mininterInfo.header}>------------------------</Text>
                  <Text style={mininterInfo.header}>SECRETARIAT GENERAL</Text>
                  <Text style={mininterInfo.header}>-------------</Text>
                  <Text style={mininterInfo.header}>AUDIENCE AVEC LE MINISTRE</Text>
                  <View>
                    <Text style={mininterInfo.title}>LISTE DES AUDIENCES { String(audience_status).toUpperCase() } DU { formatDateForPdf(new Date(date_debut)) } AU { formatDateForPdf(new Date(date_end)) }</Text>
                  </View>
                  <View style={audience.table}>
                    <View style={audience.rowhead}>
                      <View style={audience.cell}>
                        <Text>NOM ET PRENOM(S) </Text>
                      </View>
                      <View style={audience.cell}>
                        <Text>CIN</Text>
                      </View>
                      <View style={audience.cell}>
                        <Text>TYPE</Text>
                      </View>
                      <View style={audience.cell}>
                        <Text>DATE</Text>
                      </View>
                    </View>
                    {audiences.map((audi: any, index: any) => (
                      <View style={audience.row} key={index}>
                        <View style={audience.cell}>
                          <Text>{ audi.user_nom } { audi.user_prenom }</Text>
                        </View>
                        <View style={audience.cell}>
                          <Text>{ audi.user_cni }</Text>
                        </View>
                        <View style={audience.cell}>
                          <Text>{ audi.request_type }</Text>
                        </View>
                        <View style={audience.cell}>
                          <Text>{ audi.availability_date } de { audi.availability_hour_debut } à { audi.availability_hour_end } </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <Text style={audience.total}>Arreté au nombre total de { total }.</Text>
                  <Text style={audience.date}>Antananarivo, le </Text>
                  <Text style={audience.signature}>SECRETARIAT GENERAL</Text>
                </View>
              </Page>
            </Document>
            </PDFViewer>
    </div>
  )
}

export default GeneratePdf;