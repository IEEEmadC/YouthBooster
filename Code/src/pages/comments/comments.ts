import { Commentaire } from '../../modals/comment.modal';
import { User } from '../../modals/user.modal';
import { Project } from '../../modals/project.modal';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';


/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html'
})
export class CommentsPage {

  @ViewChild(Content) content: Content;

  TAG = '<ion-icon name="arrow-round-up" class="up"></ion-icon>';

  myProfile: object;

  friend = {
    fullname: "Mejri khalil",
    username: "khalil M"
  };

  comments = [
    {
      from: 'londonGuy97',
      content: 'Hello world!',
      reply: [],
      authorize: false,
      liked: true,
      likes: 12
    },
    {
      from: 'me',
      content: 'nice to meet you',
      reply: [
        {
          from: 'londonGuy97',
          content: 'nice to meet u 2 ^^',
          likes: 6,
          liked: true
        }
      ],
      authorize: false,
      likes: 11,
      liked: false
    },
    {
      from: 'me',
      content: 'nice to meet u 2 ^^',
      reply: [],
      authorize: false,
      likes: 34,
      liked: true
    }
  ];

  input: string = '';
  text_reply: string = '';
  isLoading: boolean = false;

  // firebase references
  project: Project;
  author: User;
  commentaires: Commentaire[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    //this.isLoading = true;
    /*
    this.messages = this.msgMocks.items;
    this.friend = this.navParams.get('friend');
    forkJoin(
      this.http.get('my-profile.json')
    ).subscribe(([profile]) => {
      this.isLoading = false;
      this.myProfile = <User>profile;
    });
    */
  }

  ionViewWillEnter(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    });
  }


  doSend() {
    if(this.input.length > 0) {
      this.comments.push({
        from: 'me',
        content: this.input,
        reply: [],
        authorize: false,
        likes: 0,
        liked: false
      });
      // flash input 
      this.input = '';
      this.scrollToBottom();
    }
  }

  openAuthorProfile() { }

  openProfile(prifile_id) { }

  addLikes(index, idx) {
    if (idx == null && !this.comments[index].liked) {
      this.comments[index].likes++;
      this.comments[index].liked = true;
    }
    if (idx != null && !this.comments[index].reply[idx].liked) {
      this.comments[index].reply[idx].likes++;
      this.comments[index].reply[idx].liked = true;
    }
  }

  undo(index, idx) {
    if (idx == null) {
      this.comments[index].likes--;
      this.comments[index].liked = false;
    }

    else {
      this.comments[index].reply[idx].likes--;
      this.comments[index].reply[idx].liked = false;
    }
  }

  replyTo(index) {
    this.comments[index].authorize = true;
  }


  doReply(index) {
    this.comments[index].authorize = false;
    this.comments[index].reply.push({
      from: 'me',
      content: this.text_reply,
      likes: 0,
      liked: false
    });
    // flash input 
    this.text_reply = '';

  }

  onfocusOut(index) {
    this.comments[index].authorize = false;
  }

  delete(index, idx) {

    const alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: "Do you want to delete this comment permanent?",
      buttons: [
        {
            text: "Cancel",
            role: 'cancel',
            handler: () => {
            // dismiss
            }
        },
        {
            text: "OK",
            handler: () => {
            // processe delete
            if (idx == null) {
              this.comments.splice(index,1);
            }
        
            else {
              this.comments[index].reply.splice(idx,1);
            }        
          }
        }
    ],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  }
}
