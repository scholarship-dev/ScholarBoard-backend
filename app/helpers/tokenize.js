/*
      This file contains funtions to clean up scrapped data

*/

const ethnicity_keywords = ["indigenous", "white peope", "African Americans", "Jewish People", "Asian people", "Arabs", "Native Americans", "Black people", "pacific islander", "Irannian people", "Native Hawaiians", "Alaska Natives", "Latino", "Multiracial", "Hispanic and Latino Americans", "Mexicans", "Pacific Islands Americans", "Irish People"]
const grade_keywords = ["freshman", "sophomore", "junior", "senior"]
const education_level_keywords = ["high school", "college", "undergrad", "undergraduate", "university",]


/* Extracts the ethnicity requirement from the scholarship description
  @param - text_body : the string that contains the scholarship requirement
  @param - user : the user in which we are matching the ethnicity to
  @return - ethnicity : the ethnicity requirement
*/
exports.extractEthnicity = function(text_body, user){

  // removes whitespace from text_body and grabs the logged in user's ethnicity
  const stripped_text = text_body.replace(/\s/g, "")
  const key = user.ethnicity
  let ethnicity

  // grabs the startig and ending indexes of the ethnicity in the text body
  const start_index = stripped_text.indexOf(key)
  const end_index = (start_index + key.length)

  ethnicity_keywords.forEach(function(ethni_keyword){
    if (stripped_text.includes(ethni_keyword)){

      // extracts the ethnicity if a keyword is found in the requirements text
      ethnicity = stripped_text.slice(start_index, end_index)
      return ethnicity
    } else{
      console.log("Scholarship doesn't have ethnicity requirements");
      return null
    }
  })
}

/* Cleans up a body of text from special characters
  @param - stringArray : An array of strings to be cleaned up
*/
exports.cleanTextBody = function(stringArray){

  stringArray.forEach(function(string){
    string.replace(/(\t\n|\n|\t)/gm,"")
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
