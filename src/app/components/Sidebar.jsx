"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Sidebar() {
    const pathname = usePathname();
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className={`nav-item ${pathname == '/dashboard' ? 'active' : ''}`}>
                    <Link className="nav-link" href="/dashboard">
                        <i className="mdi mdi-grid-large menu-icon"></i>
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item nav-category">Administrative</li>
                <li className={`nav-item ${pathname.startsWith('/user-management') ? 'active' : ''}`}>
                    <a className={`nav-link ${!pathname.startsWith('/user-management') ? 'collapsed' : ''}`} data-bs-toggle="collapse" href="#user_management" aria-expanded="false" aria-controls="user_management">
                        <i className="menu-icon mdi mdi-floor-plan"></i>
                        <span className="menu-title" style={{ fontSize: '14px' }}>User Management</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className={`collapse ${pathname.startsWith('/user-management') ? 'show' : ''}`} id="user_management">
                        <ul className="nav flex-column sub-menu">
                            <li className={`nav-item`}>
                                <Link className={`nav-link ${pathname == '/user-management/role-management' ? 'active' : ''}`} href="/user-management/role-management">Role Management</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${pathname == '/user-management/users' ? 'active' : ''}`} href="/user-management/users">Users</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className={`nav-item ${pathname.startsWith('/book-management') ? 'active' : ''}`}>
                    <a className={`nav-link ${!pathname.startsWith('/book-management') ? 'collapsed' : ''}`} data-bs-toggle="collapse" href="#book_management" aria-expanded="false" aria-controls="book_management">
                        <i className="menu-icon mdi mdi-floor-plan"></i>
                        <span className="menu-title" style={{ fontSize: '14px' }}>Book Management</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className={`collapse ${pathname.startsWith('/book-management') ? 'show' : ''}`} id="book_management">
                        <ul className="nav flex-column sub-menu">
                            <li className={`nav-item`}>
                                <Link className={`nav-link ${pathname == '/book-management/book-list' ? 'active' : ''}`} href="/book-management/book-list">Book List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${pathname == '/book-management/circulation' ? 'active' : ''}`} href="/book-management/circulation">Circulation</Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
