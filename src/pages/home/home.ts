import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  polls: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.polls = db.list('/polls');
  }

  addPoll() {
    let prompt = this.alertCtrl.create({
      title: 'Poll Name',
      message: "Enter a name for your new poll",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.polls.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updatePoll(pollId, pollTitle) {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: pollTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.polls.update(pollId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removePoll(pollId: string) {
    this.polls.remove(pollId);
  }

  showOptions(pollId, pollTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Poll',
          role: 'destructive',
          handler: () => {
            this.removePoll(pollId);
          }
        }, {
          text: 'Update Title',
          handler: () => {
            this.updatePoll(pollId, pollTitle);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
