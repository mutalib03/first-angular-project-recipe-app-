import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }

  onLogout(): void {
     this.authService.logout()
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
