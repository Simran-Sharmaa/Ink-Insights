import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Utils/Logo'

function Footer() {
  return (
    <section className="p-4 border-top mt-5 ">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-5">
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-2">
            <div className="h-100">
              <h3 className="mb-4 text-uppercase">Company</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Features</Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Pricing</Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Affiliate Program</Link>
                </li>
                <li>
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Press Kit</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-2">
            <div className="h-100">
              <h3 className="mb-4 text-uppercase text-gray-500">Support</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Account</Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Help</Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Contact Us</Link>
                </li>
                <li>
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Customer Support</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="h-100">
              <h3 className="mb-4 text-uppercase text-gray-500">Legals</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Terms &amp; Conditions</Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/" className="text-secondary-emphasis  text-decoration-none ">Licensing</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
