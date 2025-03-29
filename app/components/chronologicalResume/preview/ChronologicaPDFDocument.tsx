// components/pdf/ChronologicalPDFDocument.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import {
  PersonalInfo,
  Summary,
  Experience,
  Education,
  Skill,
  Certification,
} from "@/app/context/ResumeBuilderContext";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
    textTransform: "uppercase",
  },

  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#1e3a8a",
    marginTop: 12,
    width: "100%",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
  },
  subText: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 2,
    lineHeight: 1.5,
    color: "#444",
    whiteSpace: "pre-wrap",
  },
  jobTitleLine: {
    fontSize: 12,
    fontWeight: "bold",
  },

  dateRange: {
    fontSize: 10,
    color: "#666",
  },

  company: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 4,
  },

  duties: {
    paddingLeft: 10,
    marginTop: 2,
  },

  bulletItem: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  certItem: {
    marginBottom: 10,
  },

  certTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },

  certDates: {
    fontSize: 10,
    color: "#666",
  },

  certIssuer: {
    fontSize: 10,
    color: "#333",
    marginTop: 2,
  },
  eduItem: {
    marginBottom: 10,
  },

  eduDegree: {
    fontSize: 12,
    fontWeight: "bold",
  },

  eduDates: {
    fontSize: 10,
    color: "#666",
  },

  eduSchool: {
    fontSize: 10,
    color: "#333",
    marginTop: 2,
  },
  skillItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  skillName: {
    fontSize: 11,
    fontWeight: "normal",
  },

  skillLevel: {
    fontSize: 11,
    fontFamily: "Courier", // helps with block alignment
  },
});

interface Props {
  personalInfo: PersonalInfo;
  summary: Summary | null;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
}

const ChronologicalPDFDocument: React.FC<Props> = ({
  personalInfo,
  summary,
  experiences,
  education,
  skills,
  certifications,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Personal Info */}
      <View style={styles.section}>
        {/* Name */}
        <View style={{ textAlign: "center", marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}>
            {personalInfo?.firstName} {personalInfo?.lastName}
          </Text>
        </View>

        {/* Job Title */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 4,
          }}>
          {personalInfo?.jobTitle || "Job Title"}
        </Text>

        {/* Address */}
        <Text style={{ textAlign: "center", fontSize: 12, marginBottom: 6 }}>
          {personalInfo?.address || "1234 Main St, Anytown, MA 12345"}
        </Text>

        {/* Contact info */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
          }}>
          <Text style={styles.subText}>
            📧 {personalInfo?.email || "you@email.com"}
          </Text>
          <Text style={{ marginHorizontal: 4 }}>|</Text>
          <Text style={styles.subText}>
            📞 {personalInfo?.phone || "(123) 456-7890"}
          </Text>
          <Text style={{ marginHorizontal: 4 }}>|</Text>
          <Text style={styles.subText}>
            🌐 {personalInfo?.website || "www.yourportfolio.com"}
          </Text>
        </View>

        {/* Divider */}
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#1e3a8a",
            marginTop: 12,
            width: "100%",
          }}
        />
      </View>

      {/* Summary */}
      {summary && (
        <View style={styles.section}>
          <Text style={styles.heading}>Professional Summary</Text>
          <Text style={styles.subText}>
            {typeof summary === "string"
              ? summary
              : typeof summary === "object" && summary.text
              ? summary.text
              : "Start typing your summary..."}
          </Text>
        </View>
      )}

      {/* Experiences */}
      {experiences?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>

          {experiences.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              {/* Role + Dates */}
              <Text style={styles.jobTitleLine}>
                {exp.role || "Job Title"}{" "}
                <Text style={styles.dateRange}>
                  {" "}
                  |{" "}
                  {exp.startDate
                    ? new Date(exp.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Start Date"}{" "}
                  -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Present or End Date"}
                </Text>
              </Text>

              {/* Company Name */}
              <Text style={styles.company}>
                {exp.company || "Company Name"}
              </Text>

              {/* Duties */}
              {exp.duties && (
                <View style={styles.duties}>
                  {exp.duties.split("\n").map((duty, i) => (
                    <Text key={i} style={styles.bulletItem}>
                      • {duty.replace(/^\s*-\s*/, "")}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>

          {education.map((edu, index) => (
            <View key={index} style={styles.eduItem}>
              <Text style={styles.eduDegree}>
                {edu.degree}: {edu.field}{" "}
                <Text style={styles.eduDates}>
                  | {edu.startYear || "Start Year"} -{" "}
                  {edu.endYear || "End Year"}
                </Text>
              </Text>
              <Text style={styles.eduSchool}>
                {edu.school || "School Name"}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {certifications?.some(
        (cert) =>
          cert.title || cert.issuer || cert.issueDate || cert.expirationDate
      ) && (
        <View style={styles.section}>
          <Text style={styles.heading}>
            Training & Professional Certifications
          </Text>
          {certifications.map((cert, index) => (
            <View key={index} style={styles.certItem}>
              <Text style={styles.certTitle}>
                {cert.title || "Certification Title"}{" "}
                <Text style={styles.certDates}>
                  |{" "}
                  {(cert.issueDate &&
                    new Date(cert.issueDate).toISOString().split("T")[0]) ||
                    "N/A"}{" "}
                  -{" "}
                  {(cert.expirationDate &&
                    new Date(cert.expirationDate)
                      .toISOString()
                      .split("T")[0]) ||
                    "N/A"}
                </Text>
              </Text>
              <Text style={styles.certIssuer}>
                {cert.issuer || "Issuing Organization"}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>

          {skills.map((skill, index) => {
            const level = parseInt(skill.level, 10);
            const filled = "■".repeat(level);
            const empty = "□".repeat(5 - level);

            return (
              <View key={index} style={styles.skillItem}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillLevel}>{filled + empty}</Text>
              </View>
            );
          })}
        </View>
      )}
    </Page>
  </Document>
);

export default ChronologicalPDFDocument;
