import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = false;
  message = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loading = true;

    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.loading = false;
        this.message = 'No se pudo cargar la información del usuario.';
      },
    });
  }
}