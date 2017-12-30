import { Injectable } from '@angular/core';

import {LabelTuple} from './model/LabelTuple';
import {LanguageInfo} from './model/languageInfo';

@Injectable()
export class LanguageService {

  private map: { [key: string]: LabelTuple; } = {
    'welcometext' : {valueDe : 'Wilkommen hier im Cranium!', valueEn : 'Welcome!'},
    'home' : {valueDe : 'Zuhause', valueEn : 'Home'},
    'courses' : {valueDe : 'Kurse', valueEn : 'Courses'},
    'myresults' : {valueDe : 'Meine Resultate', valueEn : 'My results'},
    'questions' : {valueDe : 'Fragen', valueEn : 'Questions'},
    'addquestion' : {valueDe : 'Frage hinzufügen', valueEn : 'Add question'},
    'searchquestion' : {valueDe : 'Fragen suchen', valueEn : 'Search for questions'},
    'myquestions' : {valueDe : 'Meine Fragen', valueEn : 'My questions'},
    'admin' : {valueDe : 'Admin', valueEn : 'Admin'},
    'tags' : {valueDe : 'Tags', valueEn : 'Tags'},
    'addtag' : {valueDe : 'Tag hinzufügen', valueEn : 'Add a tag'},
    'addcourse' : {valueDe : 'Kurs hinzufügen', valueEn : 'Add course'},
    'logout' : {valueDe : 'Ausloggen', valueEn : 'Log out'},
    'title' : {valueDe : 'Titel', valueEn : 'Title'},
    'titelrequired' : {valueDe : 'Titel ist ein Mussfeld', valueEn : 'Title is required'},
    'language' : {valueDe : 'Sprache', valueEn : 'Langauge'},
    'languagerequired' : {valueDe : 'Sprache ist ein Mussfeld', valueEn : 'Language is required'},
    'state' : {valueDe : 'Status', valueEn : 'State'},
    'created' : {valueDe : 'erstellt', valueEn : 'created'},
    'approved' : {valueDe : 'freigeschalten', valueEn : 'approved'},
    'superseded' : {valueDe : 'überholt', valueEn : 'superseded'},
    'text' : {valueDe : 'Text', valueEn : 'Text'},
    'addimage' : {valueDe : 'Bild hinzufügen', valueEn : 'Add image'},
    'option' : {valueDe : 'Option', valueEn : 'Option'},
    'removeoption' : {valueDe : 'Option entfernen', valueEn : 'Remove option'},
    'addoption' : {valueDe : 'Option hinzufügen', valueEn : 'Add option'},
    'explanation' : {valueDe : 'Erklärung', valueEn : 'Explanation'},
    'preview' : {valueDe : 'Vorschau', valueEn : 'Preview'},
    'save' : {valueDe : 'Speichern', valueEn : 'Save'},
    'editquestion' : {valueDe : 'Frage #{0} editieren', valueEn : 'Edit question #{0}'},
    'add' : {valueDe : 'Hinzufügen', valueEn : 'Add'},
    'editcourse' : {valueDe : 'Kurs #{0} editieren', valueEn : 'Edit question #{0}'},
    'numquestions' : {valueDe : 'Anzahl Fragen', valueEn : 'Number of questions'},
    'numquestionsrequired' : {valueDe : 'Anzahl Fragen ist ein Mussfeld', valueEn : 'Number of questions required'},
    'description' : {valueDe : 'Beschreibung', valueEn : 'Description'},
    'questionofnum' : {valueDe : 'Frage {0} von {1}', valueEn : 'Question {0} of {1}'},
    'back' : {valueDe : 'Zurück', valueEn : 'Back'},
    'nextquestion' : {valueDe : 'Nächste Frage', valueEn : 'Next question'},
    'endcourse' : {valueDe : 'Kurs beenden', valueEn : 'End course'},
    'check' : {valueDe : 'Prüfen', valueEn : 'Check'},
    'comment' : {valueDe : 'Kommentar', valueEn : 'Comment'},
    'addcomment' : {valueDe : 'Kommentar hinzufügen', valueEn : 'Add comment'},
    'nocoursesdone' : {valueDe : 'Keine Kurse absolviert.', valueEn : 'No courses done.'},
    'namerequired' : {valueDe : 'Name ist ein Mussfeld', valueEn : 'Name is required'},
    'edittag' : {valueDe : 'Tag #{0} editieren', valueEn : 'Edit tag #{0}'},
    'name' : {valueDe : 'Name', valueEn : 'Name'},
    'tagname' : {valueDe : 'Tagname', valueEn : 'Name of tag'},
    'search' : {valueDe : 'Suchen', valueEn : 'Search'},
    'saveok' : {valueDe : 'Die Daten wurden gespeichert', valueEn : 'Data saved'},
    'edit' : {valueDe : 'Bearbeiten', valueEn : 'Edit'},
    'count' : {valueDe : 'Anzahl', valueEn : 'Elements found'},
    'andtags' : {valueDe : 'Und Tags', valueEn : 'And tags'},
    'ortags' : {valueDe : 'Oder Tags', valueEn : 'Or tags'},
    'deletecomment' : {valueDe : 'Kommentar löschen?', valueEn : 'Delete comment?'},
    'nocomments' : {valueDe : 'Keine Kommentare vorhanden', valueEn : 'No comments yet'},
    'ok' : {valueDe : 'Ok', valueEn : 'Ok'},
    'cancel' : {valueDe : 'Abbrechen', valueEn : 'Cancel'},
    'deletecourseinstance' : {valueDe : 'Resultat löschen', valueEn : 'Delete result'},
    'deletecourseinstanceq' : {valueDe : 'Resultat {0} löschen?', valueEn : 'Delete result?'},
    'deletequestion' : {valueDe : 'Frage löschen', valueEn : 'Delete question'},
    'deletequestionq' : {valueDe : 'Frage mit Id {0} löschen?', valueEn : 'Delete question with id {0}?'},
    'deletetag' : {valueDe : 'Tag löschen', valueEn : 'Delete tag'},
    'deletetagq' : {valueDe : 'Tag {0} löschen?', valueEn : 'Delete tag {0}?'},
    'copy' : {valueDe : 'Kopieren', valueEn : 'Copy'},
    'copyquestion' :  {valueDe : 'Frage kopieren', valueEn : 'Copy question'},
    'copyquestionq' :  {valueDe : 'Frage kopieren?', valueEn : 'Copy question?'},
    'nomyquestions' :  {valueDe : 'Noch keine Fragen erfasst', valueEn : 'No questions created yet'},
    'accept' :  {valueDe : 'Freigeben', valueEn : 'Release'},
    'acceptquestion' :  {valueDe : 'Freigeben', valueEn : 'Release'},
    'acceptquestionq' :  {valueDe : 'Frage für andere freigeben?', valueEn : 'Make question accessible by other users?'},
    'version' :  {valueDe : 'Neue Version erstellen', valueEn : 'create new version'},
    'versionq' :  {valueDe : 'Neue Version erstellen?', valueEn : 'create a new version?'},
    'removeImage' :  {valueDe : 'Bild entfernen', valueEn : 'remove image'},
    'removeTag' :  {valueDe : 'Tag entfernen', valueEn : 'remove tag'},
    'width' :  {valueDe : 'Breite', valueEn : 'width'},
  };


  private languageInfo: LanguageInfo = LanguageInfo.De;


  constructor() { }

  public label(key: string, ...placeholders: string[]): string {
    const tuple = this.map[key];
    let result;
    switch (this.languageInfo) {
      case LanguageInfo.En:
        result = tuple.valueEn;
        break;
      default:
        result = tuple.valueDe;
        break;
    }

    for (let i = 0; i < placeholders.length; i++) {
      const toReplace = `{${i}}`;
      result = result.replace(toReplace, placeholders[i]);
    }

    return result;
  }

  public selectLanguage(lang: LanguageInfo) {
    this.languageInfo = lang;
  }

  public getLanguage(): LanguageInfo {
    return this.languageInfo;
  }
}
