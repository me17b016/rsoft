const fs = require('fs');
const path = require('path');

let str1 = "\\documentclass[a4paper,10pt]{article}\n\\usepackage{anysize}\n\\usepackage[space]{grffile}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage{graphicx}\n";
let str2 = "\\usepackage[left=0.75in, right=0.75in, top=0.5in, bottom=0.75in, includefoot, headheight=13.6pt]{geometry}\n\\usepackage{color,graphicx}\n\\usepackage{verbatim}\n";
let str3 = "\\usepackage{hyperref}\n\\usepackage{multirow}\n\\usepackage{latexsym}\n\\usepackage{mdwlist}\n\\usepackage{tabularx}\n\\renewcommand{\\labelitemii}{$\\circ$}\n\\renewcommand{\\baselinestretch}{1.15}\n\n\n\n";

let def1 = "\\hypersetup{\nbookmarks=true, \nunicode=false, \npdftoolbar=true, \npdfmenubar=true,\n";

let def2 = "pdffitwindow=true,\npdftitle={resume},\n pdfauthor={Newton}, \npdfsubject={Placements IITTP},\ncolorlinks=true,\n";
let def3 = "linkcolor=magenta,\ncitecolor=blue,\nfilecolor=magenta,\nurlcolor=cyan\n}\n\n\n";
let mar = "\\addtolength{\\oddsidemargin}{-0.215in}\n\\addtolength{\\textwidth}{0.2in}\n\\definecolor{titleColor}{rgb}{0.85, 0.85, 0.85}\n\n";

function makeTex(raw, texPath) {
  //console.log(texPath);
  fs.writeFileSync(texPath, str1);
  fs.appendFileSync(texPath, str2);
  fs.appendFileSync(texPath, str3);
  fs.appendFileSync(texPath, def1);
  fs.appendFileSync(texPath, def2);
  fs.appendFileSync(texPath, def3);
  fs.appendFileSync(texPath, mar);
  fs.appendFileSync(texPath, "\\begin{document}\n\n"); // document begins

  basic(raw['basicDetails'], texPath);
  if (raw['educationDetails'].length > 0) {
    educationDetails(raw['educationDetails'], texPath);
  }
  if (raw['areasOfInterest'].length > 0) {
    areaOfInterest(raw['areasOfInterest'], texPath);
  }
  if(raw['technicalProficiencies'].length>0){
      technicalProficiency(raw['technicalProficiencies'],texPath);
  }
  if (raw['Publications'].length>0) {
      publications(raw['Publications'],texPath);  // uncomment when publications component is fixed
  }
  if(raw['Experiences'].length>0){
      experiences(raw['Experiences'],texPath);
  }
  if(raw['Projects'].length>0){
      Projects(raw['Projects'],texPath);
  }
  if(raw['relevantCourses'].length>0){
      relevantCourses(raw['relevantCourses'],texPath);
  }
  if(raw['Achievements'].length>0){
      achievements(raw['Achievements'],texPath);
  }
  if(raw['positionOfResponsibilities'].length>0){
      positionOfResponsibilities(raw['positionOfResponsibilities'],texPath);
  }
  if(raw['extraCurricularActivities'].length>0){
      extraCurricularActivities(raw['extraCurricularActivities'],texPath);
  }
  if(raw['hobbiesOrInterests'].length>0){
      hobbiesOrInterests(raw['hobbiesOrInterests'],texPath);
  }
  fs.appendFileSync(texPath, "\\end{document}\n"); // document ends
}
let logopath=path.join(__dirname, '../', 'resumeassests', 'logoupdated.png');
logopath = logopath.split('\\').join('/');
decimalIndex=logopath.lastIndexOf(".");
pathStart=logopath.slice(0,decimalIndex);
pathExte=logopath.slice(decimalIndex);
// console.log('{"'+pathStart+'"}'+pathExte);
let basic_begin = "\\begin{table}[h!]\n\n\\begin{center}\n\\begin{tabular}{ p{1.05in}p{4.45in}p{0.8in}}\n\\raisebox{-1.05\\totalheight}{\\includegraphics[width=1.47in]{"+'{"'+pathStart+'"}'+pathExte+"}}\n&\n\\begin{itemize}\n\\setlength\\itemsep{.01em}\n";
let basic_end1 = "\\end{itemize}\n";
let basic_end3 = "\\end{tabular}\n\\end{center}\n\\end{table}\n\n\\vspace{-.8cm}\n\n";
let educationDetails_begin1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Education Details}}}\n\\\\ \\\\\n";
let educationDetails_begin2 = "\\indent \\begin{tabular}{p{2.2in} p{2.6in} p{0.5in} p{0.9in}}\n";
let educationDetails_begin3 = "\\hline\n\\textbf{Program} & \\textbf{Institute} & \\textbf{Year} & \\textbf{\\%/CGPA} \\\\ \n \\hline\n\n";

function updateValueLatex(str) {
  str = str.split("%").join("\\%");
  str = str.split("'").join("\'");
  str = str.split("{").join("\\{");
  str = str.split("}").join("\\}");
  str = str.split('"').join('\"');
  str = str.split('&').join("\\&");
  str = str.split('#').join("\\#");
  return str;
}

function basic(basic, texPath) {
  const fs = require('fs');
  fs.appendFileSync(texPath, basic_begin);
  fs.appendFileSync(texPath, `\\item[] \\textbf{${updateValueLatex(basic['name'])}}\n`)
  fs.appendFileSync(texPath, `\\item[] \\textbf{${updateValueLatex(basic['degree'])}}\n`)
  fs.appendFileSync(texPath, `\\item[] \\textbf{${"Indian Institute of Technology Tirupati, India"}}\n`)
//    fs.appendFileSync(path.join('./routes/tex', fileName), `\\item[] \\textbf{${updateValueLatex(basic['email'])}}\n`)
  fs.appendFileSync(texPath, `\\item[] \\textbf{\\url{${updateValueLatex(basic['linkedIn'])}}}\n`)
  fs.appendFileSync(texPath, basic_end1);
 
  let profilepath=basic.imageName;
  profilepath = profilepath.split('\\').join('/');
  decimalIndex=profilepath.lastIndexOf(".");
  pathStart=profilepath.slice(0,decimalIndex);
  pathExte=profilepath.slice(decimalIndex);
  // console.log('{"'+pathStart+'"}'+pathExte);
  let basic_end_photo = "&\n\\raisebox{-0.8\\totalheight}{\\includegraphics[width=1in,height=1.3in]{"+'{"'+pathStart+'"}'+pathExte+"}}\n";
  fs.appendFileSync(texPath, basic_end_photo);
  fs.appendFileSync(texPath, basic_end3);
}

function educationDetails(educationDetails, texPath) {
  const fs = require('fs');
  fs.appendFileSync(texPath, educationDetails_begin1);
  fs.appendFileSync(texPath, educationDetails_begin2);
  fs.appendFileSync(texPath, educationDetails_begin3);
  for (let j = 0; j < educationDetails.length; j++) {
      let i = educationDetails[j];
      fs.appendFileSync(texPath,`${updateValueLatex(i['programme'])} & ${updateValueLatex(i['institute'])} & ${updateValueLatex(i['year'])} & ${updateValueLatex(i['marks'])}\\\\ \n`);
  }
  fs.appendFileSync(texPath, "\\end{tabular}\\\\\n\n");
}

function areaOfInterest(areaOfInterest, texPath) {
  const fs = require('fs');
  let aof_begin1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Areas of Interest}}}\n";
  let aof_begin2 = "\\begin{itemize}\\setlength{\\itemsep}{1pt}\n";
  fs.appendFileSync(texPath, aof_begin1);
  fs.appendFileSync(texPath, aof_begin2);
  fs.appendFileSync(texPath, "\\item {{");
  let tem = "";
  for (let i = 0; i < areaOfInterest.length; i++) {
      tem += areaOfInterest[i]['interest'];
      if (i < areaOfInterest.length - 1) tem += ', ';
  }
  fs.appendFileSync(texPath, `${updateValueLatex(tem)}}}\n\\end{itemize}\n\n`);
}

function technicalProficiency(technicalProficiency, texPath) {
  const fs = require('fs');
  let tp1 = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Technical Proficiency}}}\\\\ \n\n";
  let tp2 = "\\begin{tabular}{p{1.6in}p{0.1in}p{4.5in}}\n";
  fs.appendFileSync(texPath, tp1);
  fs.appendFileSync(texPath, tp2);
  for (let i = 0; i < technicalProficiency.length; i++) {
      let title = technicalProficiency[i]['title'];
      let values = technicalProficiency[i]['value'];
      let tem = `\\textbf{\\small{${updateValueLatex(title)}}} &: &{{${updateValueLatex(values)}}} \\\\\n`;
      fs.appendFileSync(texPath, tem);
  }
  fs.appendFileSync(texPath, "\\end{tabular}\\\\\n\n");
}

function publications(publications, texPath) {
  const fs = require('fs');
  let pb = `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Publications}}} \n
  \\begin{itemize}\n\n`;
  fs.appendFileSync(texPath, pb);
  for (let i = 0; i < publications.length; i++) {
      let title = publications[i]['title'];
      let author = publications[i]['authors'];
  let place = publications[i]['place'];
      let details = publications[i]['description'];
      let doi = publications[i]['doi'];
      fs.appendFileSync(texPath, `\\setlength{\\itemsep}{1pt}\n`);
      fs.appendFileSync(texPath, `\\item \\textbf{${updateValueLatex(title)}}\n`);
      fs.appendFileSync(texPath, `\\newline \\textbf{Authors:} ${updateValueLatex(author)}\n`);
  fs.appendFileSync(texPath, `\\newline \\textbf{Place of Publication:} ${updateValueLatex(place)}\n`);
      fs.appendFileSync(texPath, `\\newline \\textbf{Description:} ${updateValueLatex(details)}\n`);
      fs.appendFileSync(texPath, `\\newline \\textbf{DOI:} ${updateValueLatex(doi)}\n\n`);
  }
  fs.appendFileSync(texPath, `\\end{itemize}\n\n`);
}

function experiences(experience, texPath) {
  const fs = require('fs');
  let ap = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Experience}}}\n\n";
  fs.appendFileSync(texPath, ap);
  for (let i = 0; i < experience.length; i++) {
      let exper = experience[i]['experience'];
      let guide = experience[i]['guide'];
      let description = experience[i]['description'];
      let duration = experience[i]['duration'];
      fs.appendFileSync(texPath, `\\begin{itemize*}\n\\setlength{\\itemsep}{1pt}\n\\item \\textbf{${updateValueLatex(exper)}}`);
      if (guide == "") {
          fs.appendFileSync(texPath, `\\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}\\/}}\n`);
          fs.appendFileSync(texPath, `\\begin{itemize*}\n
          \\item ${updateValueLatex(description)} \n
          \\end{itemize*}\n
          \\end{itemize*}\n\n`);
      }
      else {
          fs.appendFileSync(texPath, `\n \\\\ {(\\textbf{Guide :} ${updateValueLatex(guide)})}`);
          fs.appendFileSync(texPath, `\\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}\\/}}\n`);
          fs.appendFileSync(texPath, '\\begin{itemize*}\n');
          fs.appendFileSync(texPath, `\\setlength{\\itemsep}{.00pt}\n
          \\item ${updateValueLatex(description)} \n
          \\end{itemize*} \n
          \\end{itemize*} \n\n`);
      }
  }
}

function Projects(Projects, texPath) {
  const fs = require('fs');
  let ap = "\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Projects}}}\n\n";
  fs.appendFileSync(texPath, ap);
  for (let i = 0; i < Projects.length; i++) {
      let project_name = Projects[i]['name'];
      let guide = Projects[i]['guide'];
      let description = Projects[i]['description'];
      let duration = Projects[i]['duration'];
      fs.appendFileSync(texPath, `\\begin{itemize*}\n\\setlength{\\itemsep}{1pt}\n\\item \\textbf{${updateValueLatex(project_name)}}`);
      if (guide == "") {
          fs.appendFileSync(texPath, `\\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}\\/}}\n`);
          fs.appendFileSync(texPath, '\\begin{itemize*}\n');
          fs.appendFileSync(texPath, `\\setlength{\\itemsep}{.00pt}\n
          \\item \\textbf{Abstract}: ${updateValueLatex(description)} \n
          \\end{itemize*} \n
          \\end{itemize*} \n\n`);
      }
      else {
          fs.appendFileSync(texPath, `\n \\\\ {(\\textbf{Guide :} ${updateValueLatex(guide)})}`);
          fs.appendFileSync(texPath, `\\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}\\/}}\n`);
          fs.appendFileSync(texPath, '\\begin{itemize*}\n');
          fs.appendFileSync(texPath, `\\setlength{\\itemsep}{.00pt}\n
          \\item \\textbf{Abstract}: ${updateValueLatex(description)} \n
          \\end{itemize*} \n
          \\end{itemize*} \n\n`);
      }
  }
}

function relevantCourses(relevantCourses, texPath) {
  const fs = require('fs');
  let rc = `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Relevant Courses}}}\\\\[0.08in]
  \\begin{tabular}{p{3.5in}p{3in}p{2.5in}}\n`;
  fs.appendFileSync(texPath, rc);
  for (let i = 0; i < relevantCourses.length; i = i + 2) {
      let course1 = relevantCourses[i]['relevantcourse'], course2 = "";
      if (i + 1 < relevantCourses.length) {
          course2 = relevantCourses[i + 1]['relevantcourse'];
      }
      fs.appendFileSync(texPath, `\\hspace{0.9pc}$\\bullet$ ${updateValueLatex(course1)}`)
      if (course2 != "") fs.appendFileSync(texPath, `&$\\bullet$ ${updateValueLatex(course2)}\\\\[0.05in]\n`);
      else fs.appendFileSync(texPath, '\\\\[0.05in]\n');
  }
  fs.appendFileSync(texPath, `\\hspace{0.9pc}\\textbf{\* To be completed in December 2020}\n\n\n`);
  fs.appendFileSync(texPath, `\\end{tabular}\n\n\n`);
  
}

function achievements(achievements, texPath) {
  const fs = require('fs');
  fs.appendFileSync(texPath, `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Achievements}}}\n
  \\begin{itemize} \n \\setlength{\\itemsep}{1pt}\n`);
  for (let i = 0; i < achievements.length; i++) {
      let achievement = achievements[i]['achievement'];
      fs.appendFileSync(texPath, `\\item ${updateValueLatex(achievement)}\n`);
  }
  fs.appendFileSync(texPath, `\\end{itemize}\n\n`);
}

function positionOfResponsibilities(positionOfResponsibilities, texPath) {
  const fs = require('fs');
  fs.appendFileSync(texPath, `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Positions of Responsibility}}}\\\\\n\n`);
  for (let i = 0; i < positionOfResponsibilities.length; i++) {
      let position = positionOfResponsibilities[i]['position'];
      let duration = positionOfResponsibilities[i]['duration'];
      let workdescription = positionOfResponsibilities[i]['description'];
      fs.appendFileSync(texPath, `\\textbf{${updateValueLatex(position)}}  \\hfill {\\small{{\\textbf{[${updateValueLatex(duration)}]}}}\\/} \n`);
      fs.appendFileSync(texPath, `\\begin{itemize*} \n
      \\item ${updateValueLatex(workdescription)} \n
      \\end{itemize*}\n\n`)
  }
}

function extraCurricularActivities(extraCurricularActivities, texPath) {
  const fs = require('fs');
  fs.appendFileSync(texPath, `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Extra Curricular activities}}}\n\n`);
  fs.appendFileSync(texPath, `\\begin{itemize}\n
  \\setlength{\\itemsep}{1pt}\n`);
  for (let i = 0; i < extraCurricularActivities.length; i++) {
      let activity = extraCurricularActivities[i]['extracurricularactivity'];
      fs.appendFileSync(texPath, `\\item ${updateValueLatex(activity)} \\hfill \n`); // error
  }
  fs.appendFileSync(texPath, `\\end{itemize}\n\n`);
}

function hobbiesOrInterests(hobbiesOrInterests, texPath) {
  const fs = require('fs');
  fs.appendFileSync(texPath, `\\colorbox{titleColor}{\\parbox{6.7in}{\\textbf{Hobbies and Interests}}}\n\n`);
  for (let i = 0; i < hobbiesOrInterests.length; i++) {
      let hobby = hobbiesOrInterests[i]['hobbyorinterest'];
      fs.appendFileSync(texPath, `\\begin{itemize}
      \\setlength{\\itemsep}{1pt}\n`);
      fs.appendFileSync(texPath, `\\item ${updateValueLatex(hobby)}\n\\end{itemize}\n\n`);
  }
}

module.exports = makeTex;