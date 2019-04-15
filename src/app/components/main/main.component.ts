import { Component, OnInit, HostListener } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DataService } from './../../services/data.service';
declare var jquery: any;
declare var $: any;
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'app';
	mode: string;
	open: boolean;
	selectedApp: Object;
	appList: any[];
	user: any;
	data: any;
	showMenu: any;
	showLogin: boolean = true;
	userName: any;
	password: any;
	constructor(public dialog: MatDialog, public snackBar: MatSnackBar, public overlayContainer: OverlayContainer, public router: Router, private dataService: DataService) {
		this.configureSideNav();

	}
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.configureSideNav()
	}
	ngOnInit() {
		this.user = this.dataService.user;
		if (!this.user) {
			this.router.navigateByUrl('');
		}
		else {
			this.router.navigateByUrl('art');
			setTimeout(function () { $('.list-wrapper').fadeOut() }, 5000);
			setTimeout(function () {
				$(".nav-list").mouseover(function () {
					$('.list-wrapper').fadeIn();
				});
				$('.nav-list').mouseleave(function () {
					setTimeout(function () { $('.list-wrapper').fadeOut() }, 1000);
				});
			}, 5000);
			if (this.user.selectedRole === 'Art') {
				this.appList = [
					{ id: 1, name: 'Create', icon: 'C' },
					{ id: 2, name: 'Render', icon: 'R' },
					{ id: 3, name: 'Refine Grid', icon: 'EG' },
				];
			}
		}
	}
	ngOnChanges() {
		this.user = this.dataService.user;
		setTimeout(function () { $('.list-wrapper').hide() }, 5000);
		$(".nav-list").mouseover(function () {
			$('.list-wrapper').show();
		});
		$('.nav-list').mouseleave(function () {
			setTimeout(function () { console.log('init leave'); $('.list-wrapper').hide() }, 1000);
		});
	}

	changeTheme() {
		document.body.classList.toggle('light-theme');
		// this.overlayContainer.getContainerElement().classList.toggle('light-theme');
	}

	onAppSelect(item) {
		this.selectedApp = item;
		this.dataService.user.selectedApp = this.user.selectedApp = item;
	}

	configureSideNav() {

		if (window.innerWidth < 950) {
			this.mode = "over"
			this.open = false
		} else {
			this.mode = 'side'
			this.open = true
		}
	}
}
