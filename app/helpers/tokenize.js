/*
      This file contains funtions to clean up scrapped data

*/

// NEEDED KEYWORDS TO QUERY SCHOLARSHIP COLLECTION
const ethnicity_keywords = ["Indigenous", "Hispanic", "Latino", "Latina", "White peope", "African Americans", "Jewish People", "Asian people", "Arabs", "Native Americans", "Black people", "pacific islander", "Irannian people", "Native Hawaiians", "Alaska Natives", "Latino", "Multiracial", "Hispanic and Latino Americans", "Mexicans", "Pacific Islands Americans", "Irish People"]
const grade_keywords = ["freshman", "sophomore", "junior", "senior"]
const education_level_keywords = ["high school", "college", "undergrad", "undergraduate", "university"]
const gpa_keywords = ["2.0", "2.5", "3.0", "3.5", "4.0"]

/* Extracts the ethnicity requirement from the scholarship description
  @param - text_body : the string that contains the scholarship requirement
  @param - user : the user in which we are matching the ethnicity to
  @return - ethnicity : the ethnicity requirement
*/
exports.extractEthnicity = function(text_body){

  const stripped_text = text_body.replace(/\s/g, "")
  let inclusive_ethnicity = []
  ethnicity_keywords.forEach(function(ethni_keyword){
    if (stripped_text.includes(ethni_keyword)){
      inclusive_ethnicity.push(ethni_keyword)
    }
  })

  return inclusive_ethnicity
}

/* Cleans up a body of text from special characters
  @param - stringArray : An array of strings to be cleaned up
  @return - clean_strings : An array of cleaned up string in order they were passed
*/
exports.cleanTextBody = function(stringArray){

  let clean_strings = []
  stringArray.forEach(function(string){
    clean_strings.push(string.replace(/(\t\n|\n|\t)/gm, ""))
  })

  return clean_strings
}

/* Cleans up current date string to a consistent date object so it can be sorted. 
  @param - stringArray : An array of strings to be cleaned up
  @return - clean_date : Date Object
*/
exports.dateFormat = function(stringArray){
  let clean_date = []
  stringAarray.forEach(function(string){
    let clean_string = string.replace()
  })
}

/* Extract the grade(s) requirements from the scholarship's description
  @param - text_body : The scholarship description
  @return - grades : An array of grades requirements from the description
                    Example: "this scholarship is for juniors and seniors"
*/
exports.extractGrade = function(text_body){

  let grades = []
  grade_keywords.forEach(function(element){
    if(text_body.includes(element)){
      grades.push(element)
    }
  })
  return grades
}

/* Extract the education leve(s) requirements from the scholarship's description
  @param - text_body : The scholarship description
  @return - eduLevel : An array of edu. level requirements from the description
                    Example: "this scholarship is for college students"
*/
exports.extractEducationLevel = function(text_body){

  let eduLevel = []
  education_level_keywords.forEach(function(element){
    if(text_body.includes(element)){
      eduLevel.push(element)
    }
  })
  return eduLevel
}

/* Extract the gpa requirement(if any) from the scholarship's description
  @param - text_body : The scholarship description
  @return - target_gpa : the gpa requirement of the scholarship
*/
exports.extractGPA = function(text_body){

  const new_str = text_body.replace(/\s/g, "")
  let target_gpa
  // Fileter 1 : Checks if the gpa is required at all for this scholarship
  if((new_str.includes('GPA') == false) && new_str.includes("gpa") == false){
    return null
  }

  // Fileter 2 : Check if key gpa numbers are in the requirements
  gpa_keywords.forEach(function(gpa){

    // We only extract the GPA and avoid the 4.0 since it's just a scale
    if(new_str.includes(gpa) && gpa != "4.0"){
      const start_index = new_str.indexOf(gpa)
      const end_index = (start_index + gpa.length)
      target_gpa = new_str.substring(start_index, end_index)
    }
  })
  return target_gpa
}
