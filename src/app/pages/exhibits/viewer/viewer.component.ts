import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket } from '../../../shared/models/Ticket';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exhibit } from '../../../shared/models/Exhibit';
import { ExhibitsService } from '../../../shared/services/exhibits.service';
import { TicketsService } from '../../../shared/services/tickets.service';
import { tick } from '@angular/core/testing';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent implements OnInit, OnChanges {

  @Input() exhibitInput?: Exhibit;
  loadedExhibit?: string;
  user?: User;

  //ticketObject: any = {}
  tickets: Array<any> = []

  ticketsForm = this.createForm({
    id: '',
    email: '',
    quantity: 0,
    exhibitId: this.exhibitInput?.id as string
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private exhibitService: ExhibitsService,
    private ticketService: TicketsService,
    private userService: UserService) {
  }

  ngOnChanges(): void {
    if (this.exhibitInput?.id) {
      this.ticketsForm.get('exhibitId')?.setValue(this.exhibitInput.id);
      this.exhibitService.loadExhibit(this.exhibitInput.image_url).subscribe(data => {
        this.loadedExhibit = data;
      });
    }
    if (this.user) {
      this.loadExhibitAndTickets();
    }
  }
  loadExhibitAndTickets() {
    if (this.exhibitInput) {
      this.exhibitService.loadExhibit(this.exhibitInput.image_url).subscribe(data => {
        this.loadedExhibit = data;
      });

      if (this.user?.email) {
        this.ticketService.getTicketsByEmail(this.user.email).subscribe(tickets => {
          this.tickets = tickets;
        });
      } else {
        console.error('User email is not set.');
      }
    }
  }

  ngOnInit(): void {
    const userr = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(userr.uid).subscribe(data => {
      this.user = data[0];
      this.ticketsForm.get('email')?.setValue(this.user?.email as string);
      this.ticketService.getTicketsByEmail(this.user?.email as string).subscribe(tickets => {
        this.tickets = tickets;

      })
    }, error => {
      console.error(error);
    });
  }

  createForm(model: Ticket) {
    let formGroup = this.fb.group(model);
    formGroup.get('email')?.addValidators([Validators.required, Validators.email])
    formGroup.get('quantity')?.addValidators([Validators.required])

    return formGroup;
  }

  purchaseTicket() {
    if (this.ticketsForm.valid) {
      if (this.ticketsForm.get('email') && this.ticketsForm.get('quantity')) {
        this.ticketService.create(this.ticketsForm.value as Ticket).then(_ => {
          this.router.navigateByUrl('/exhibits');
        }).catch(error => {
          console.error(error);
        });
        // this.tickets.push(Object.assign({}, this.ticketObject));
        //this.router.navigateByUrl('/exhibits/successful/' + this.ticketsForm.get('email')?.value);
      }
    }
  }

}
