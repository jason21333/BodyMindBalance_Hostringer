'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-24 pb-16 bg-background text-text">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-primary mb-8 text-center"
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg p-6 md:p-8 space-y-6"
        >
          <section>
            <h2 className="text-2xl font-semibold text-text mb-3">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to Body Mind Balance. We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website bodymindbalance.com, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-3">2. Information We Collect</h2>
            <p className="text-gray-700 mb-2">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <h3 className="text-xl font-medium text-text mb-1">Personal Data:</h3>
            <p className="text-gray-700">
              Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
            </p>
            <h3 className="text-xl font-medium text-text mb-1 mt-4">Derivative Data:</h3>
            <p className="text-gray-700">
              Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </p>
            <h3 className="text-xl font-medium text-text mb-1 mt-4">Financial Data:</h3>
            <p className="text-gray-700">
              Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-700">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Create and manage your account.</li>
              <li>Enable user-to-user communications.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Generate a personal profile about you to make your visit to the Site more personalized.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to the Site.</li>
              <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
              <li>Perform other business activities as needed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-3">4. Disclosure of Your Information</h2>
            <p className="text-gray-700">
              We may share information we have collected about you in certain situations.
            </p>
            <h3 className="text-xl font-medium text-text mb-1 mt-4">By Law or to Protect Rights:</h3>
            <p className="text-gray-700">
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, or safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-3">5. Security of Your Information</h2>
            <p className="text-gray-700">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text mb-3">6. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions or comments about this Privacy Policy, please contact us at: bodymindbalancepalavacity@gmail.com
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
} 