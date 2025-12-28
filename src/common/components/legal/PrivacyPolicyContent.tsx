const PrivacyPolicyContent = () => (
  <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
    <p className="text-sm text-gray-600">
          <p>
          The PNC Student Hub is committed to protecting the privacy of its users.
          This Privacy Policy explains how personal information is collected, used,
          and protected.
        </p>

        <h3 className="font-semibold">1. Information We Collect</h3>
        <p>
          The PNC Student Hub collects the following personal information during
          account registration and system use:
        </p>
        <ul className="list-disc pl-5">
          <li>Full name</li>
          <li>Student number</li>
          <li>Department</li>
          <li>Personal email address</li>
          <li>Password (stored in encrypted or hashed form)</li>
        </ul>
        <p>
          For verification purposes, users are required to upload a copy or image of
          their official school ID.
        </p>

        <h3 className="font-semibold">2. School ID Verification</h3>
        <p>
          The uploaded school ID is used solely to verify the identity of the student
          by confirming that the name and student number match the information
          provided during registration.
        </p>
        <p className="font-medium">
          The uploaded school ID is not stored permanently. Once verification is
          completed, the ID file is automatically deleted from the system.
        </p>

        <h3 className="font-semibold">3. Purpose of Data Collection</h3>
        <p>The collected information is used to:</p>
        <ul className="list-disc pl-5">
          <li>Verify student identity</li>
          <li>Create and manage user accounts</li>
          <li>Provide access to student hub features and services</li>
          <li>Communicate important system-related notices</li>
        </ul>

        <h3 className="font-semibold">4. Data Storage and Security</h3>
        <p>
          Reasonable technical and organizational measures are implemented to protect
          personal data from unauthorized access, misuse, loss, or disclosure.
          Passwords are never stored in plain text.
        </p>

        <h3 className="font-semibold">5. Data Sharing</h3>
        <p>
          Personal information collected by the PNC Student Hub is not shared with
          third parties, except when required by law or institutional policy.
        </p>

        <h3 className="font-semibold">6. Data Retention</h3>
        <ul className="list-disc pl-5">
          <li>
            Account-related personal information is retained for as long as the user
            maintains an active account.
          </li>
          <li>
            Verification files, including uploaded school ID images, are deleted
            immediately after successful verification.
          </li>
        </ul>

        <h3 className="font-semibold">7. User Rights</h3>
        <p>Users have the right to:</p>
        <ul className="list-disc pl-5">
          <li>Request access to their personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Request account deletion through system administrators</li>
        </ul>

        <h3 className="font-semibold">8. Changes to This Privacy Policy</h3>
        <p>
          This Privacy Policy may be updated from time to time. Continued use of the
          system constitutes acceptance of the updated policy.
        </p>
        </p>
  </div>
);

export default PrivacyPolicyContent;
