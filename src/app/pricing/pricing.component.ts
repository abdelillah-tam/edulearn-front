import {
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  runInInjectionContext,
  Signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { lastValueFrom, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { showSnack } from '../global/show-snack';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pricing',
  imports: [MatIconModule, FooterComponent, MatProgressSpinnerModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent implements OnInit {
  snack = inject(MatSnackBar);

  starter = [
    'Access to 500+ courses',
    'Course completion certificates',
    'Downloadable resources',
    'Email support',
    'Community forum access',
  ];

  pro = [
    'Access to 500+ courses',
    'Course completion certificates',
    'Downloadable resources',
    'Priority 24/7 support',
    'Community forum access',
    'Lifetime access to purchased courses',
    'Early access to new courses',
    'Exclusive mentorship sessions',
  ];

  stripe: Stripe | null = null;

  clientSecret: string = '';

  stripeElement = viewChild<ElementRef>('stripe');

  card: StripeCardElement | undefined;

  isStarterSubscriptionOpened = false;

  isProSubscriptionOpened = false;

  studentUser: User | undefined;

  cardComplete = false;

  isSignIn = false;

  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    effect(() => {
      if (this.stripeElement()) {
        this.card?.mount(this.stripeElement()?.nativeElement);
        this.card?.on('change', (event) => {
          this.cardComplete = event.complete;
        });
      }
    });

    this.authService.getUser().subscribe((response) => {
      if (response) {
        this.studentUser = response;
        this.isSignIn = true;
      }

      this.isLoading = false;
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe(environment.STRIPE_PUBLISHABLE_KEY);

    this.authService.getSetupIntent().subscribe((response) => {
      this.clientSecret = response.client_secret;
    });

    let elements = this.stripe?.elements();
    this.card = elements?.create('card', {
      classes: {
        focus: 'stripe-focus',
      },
    });
  }

  async handlePayment(plan: string) {
    const setup = await this.stripe?.confirmCardSetup(this.clientSecret, {
      payment_method: {
        card: this.card!,
        billing_details: {
          name: this.studentUser?.fullname,
        },
      },
    });

    return lastValueFrom(
      this.authService.subscribe(plan, setup?.setupIntent!.payment_method),
    );
  }

  changeStarterSubscriptionState() {
    if (this.isSignIn) {
      this.isStarterSubscriptionOpened = !this.isStarterSubscriptionOpened;
      this.isProSubscriptionOpened = false;
      this.cardComplete = false;
    } else {
      this.navigateToSignIn();
    }
  }

  changeProSubscriptionState() {
    if (this.isSignIn) {
      this.isProSubscriptionOpened = !this.isProSubscriptionOpened;
      this.isStarterSubscriptionOpened = false;
      this.cardComplete = false;
    } else {
      this.navigateToSignIn();
    }
  }

  subscribeStarter() {
    this.handlePayment(environment.STARTER_PRICE).then((response) => {
      if (typeof response == 'string') {
        showSnack(this.snack, response, 'error');
      } else {
        showSnack(this.snack, 'Subscribed successfully', 'success');
        this.router.navigate(['/courses']);
      }
    });
  }

  subscribePro() {
    this.handlePayment(environment.PRO_PRICE).then((response) => {
      if (typeof response == 'string') {
        showSnack(this.snack, response, 'error');
      } else {
        showSnack(this.snack, 'Subscribed successfully', 'success');
        this.router.navigate(['/courses']);
      }
    });
  }

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }
}
