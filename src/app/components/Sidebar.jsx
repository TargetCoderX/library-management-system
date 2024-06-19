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
                    <a className={`nav-link ${!pathname.startsWith('/user-management') ? 'collapsed' : ''}`} data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <i className="menu-icon mdi mdi-floor-plan"></i>
                        <span className="menu-title" style={{ fontSize: '14px' }}>User Management</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className={`collapse ${pathname.startsWith('/user-management') ? 'show' : ''}`} id="ui-basic">
                        <ul className="nav flex-column sub-menu">
                            <li className={`nav-item`}>
                                <Link className={`nav-link ${pathname == '/user-management/role-management' ? 'active' : ''}`} href="/user-management/role-management">Role Management</Link>
                            </li>
                            <li className="nav-item">
                                <Link  className={`nav-link ${pathname == '/user-management/users' ? 'active' : ''}`} href="/user-management/users">Users</Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
