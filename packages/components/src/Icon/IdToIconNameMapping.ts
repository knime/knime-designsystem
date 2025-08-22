import type { TypeIconName } from "./DataType.vue";

export const ID_TO_ICON_MAP = {
  // Flow Variables
  STRING: "variable-string",
  LONG: "variable-integer",
  DOUBLE: "variable-number-double",
  BOOLEAN: "variable-boolean",
  INTEGER: "variable-integer",
  FSLocation: "variable-path",
  FSLocationSpec: "variable-path",
  STRINGARRAY: "variable-collection-string",
  LONGARRAY: "variable-collection-integer",
  DOUBLEARRAY: "variable-collection-double",
  BOOLEANARRAY: "variable-collection-boolean",
  INTARRAY: "variable-collection-integer",
  CREDENTIALS: "variable-credential",
  CONDAENVIRONMENT: "variable-conda-environment",
  UNKNOWN: "variable-unknown",
  // General
  "org.knime.core.data.BooleanValue": "boolean-datatype",
  "org.knime.core.data.DataValue": "unknown-datatype",
  "org.knime.core.data.DoubleValue": "number-double-datatype",
  "org.knime.core.data.IntValue": "number-integer-datatype",
  "org.knime.core.data.LongValue": "number-integer-datatype",
  "org.knime.core.data.MissingValue": "unknown-datatype",
  "org.knime.core.data.StringValue": "string-datatype",
  "org.knime.core.data.collection.ListDataValue": "collection-list-datatype",
  "org.knime.core.data.collection.SetDataValue": "collection-set-datatype",
  "org.knime.core.data.vector.doublevector.DoubleVectorValue":
    "number-double-vector-datatype",
  "org.knime.core.data.vector.stringvector.StringVectorValue":
    "string-vector-datatype",
  "org.knime.filehandling.core.data.location.FSLocationValue": "path-datatype",
  // Image, Audio & Video
  "org.knime.audio.data.cell.AudioValue": "audio-datatype",
  "org.knime.base.data.xml.SvgValue": "image-svg-datatype",
  "org.knime.core.data.image.png.PNGImageValue": "image-png-datatype",
  // Date & Time
  "org.knime.core.data.time.localdate.LocalDateValue": "date-datatype",
  "org.knime.core.data.time.localdatetime.LocalDateTimeValue":
    "date-time-local-datatype",
  "org.knime.core.data.time.localtime.LocalTimeValue": "time-datatype",
  "org.knime.core.data.time.zoneddatetime.ZonedDateTimeValue":
    "date-time-zoned-datatype",
  "org.knime.core.data.time.duration.DurationValue":
    "duration-time-based-datatype",
  "org.knime.core.data.time.period.PeriodValue": "duration-date-based-datatype",
  // Geospatial
  "org.knime.geospatial.core.data.GeoValue": "geo-datatype",
  "org.knime.geospatial.core.data.GeoLineValue": "geo-datatype",
  "org.knime.geospatial.core.data.GeoPointValue": "geo-datatype",
  "org.knime.geospatial.core.data.GeoPolygonValue": "geo-datatype",
  "org.knime.geospatial.core.data.GeoCollectionValue": "geo-datatype",
  "org.knime.geospatial.core.data.GeoMultiLineValue": "geo-datatype",
  "org.knime.geospatial.core.data.GeoMultiPointValue": "geo-datatype",
  "org.knime.geospatial.core.data.GeoMultiPolygonValue": "geo-datatype",
  // Code
  "org.knime.core.data.blob.BinaryObjectDataValue": "binary-object-datatype",
  "org.knime.core.data.html.HTMLValue": "xml-datatype",
  "org.knime.core.data.json.JSONValue": "json-datatype",
  "org.knime.core.data.uri.URIDataValue": "uri-datatype",
  "org.knime.core.data.vector.bitvector.BitVectorValue":
    "bit-byte-vector-datatype",
  "org.knime.core.data.vector.bitvector.SparseBitVectorValue":
    "bit-byte-vector-datatype",
  "org.knime.core.data.vector.bytevector.ByteVectorValue":
    "bit-byte-vector-datatype",
  "org.knime.core.data.xml.PMMLValue": "model-pmml-datatype",
  "org.knime.core.data.xml.XMLValue": "xml-datatype",
  "org.knime.knip.base.data.labeling.LabelingValue": "labeling-datatype",
  // Agentic AI
  "org.knime.ai.core.data.message.MessageValue": "message-datatype",
  "org.knime.core.node.agentic.tool.WorkflowToolValue": "tool-datatype",
  // Textprocessing
  "org.knime.ext.textprocessing.data.DocumentValue": "document-datatype",
  "org.knime.ext.textprocessing.data.TermValue": "term-datatype",
  // Network
  "org.knime.network.core.knime.cell.GraphValue": "subgraph-datatype",
  // Linear Notations
  "org.knime.chem.types.InchiValue": "linear-notation-molecule",
  "org.knime.chem.types.SlnValue": "linear-notation-molecule",
  "org.knime.chem.types.SmartsValue": "linear-notation-molecule",
  "org.knime.chem.types.SmilesValue": "linear-notation-molecule",
  // Molecular file formats
  "org.knime.chem.types.CtabValue": "molecule",
  "org.knime.chem.types.MolValue": "molecule",
  "org.knime.chem.types.Mol2Value": "molecule",
  "org.knime.chem.types.SdfValue": "molecule",
  // Biopolymer & sequence representations
  "org.knime.chem.types.helm.HELMValue": "helm-datatype",
  // Relation & Process representations
  "org.knime.chem.types.CMLValue": "test-tube",
  "org.knime.chem.types.RxnValue": "test-tube",
  // Visualization & specialized software formats
  "org.knime.bio.types.PdbValue": "microscope",
  "org.knime.chem.types.cdx.CDXMLValue": "microscope",
  "org.rdkit.knime.types.RDKitMolValue": "microscope",
  "jp.co.infocom.cheminfo.marvin.type.MrvValue": "microscope",
} as const satisfies Record<string, TypeIconName>;

export type TypeId = keyof typeof ID_TO_ICON_MAP;
