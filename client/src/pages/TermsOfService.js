import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <article>
      <h1 className="text-4xl text-center">Terms and Conditions of Use</h1>

      <h2 className="text-2xl my-5">Terms</h2>

      <p className="font-thin text-center">
        By accessing this Website, accessible from BorrowAPencil.com, you are
        agreeing to be bound by these Website Terms and Conditions of Use and
        agree that you are responsible for the agreement with any applicable
        local laws. If you disagree with any of these terms, you are prohibited
        from accessing this site. The materials contained in this Website are
        protected by copyright and trade mark law.
      </p>

      <h2 className="text-2xl my-5">Use License</h2>

      <p className="font-thin text-center">
        Permission is granted to temporarily download one copy of the materials
        on BorrowAPencil's Website for personal, non-commercial transitory
        viewing only. This is the grant of a license, not a transfer of title,
        and under this license you may not:
      </p>
      <ul className="my-5 text-center">
        <li className="my-2">modify or copy the materials</li>
        <li className="my-2">
          use the materials for any commercial purpose or for any public
          display
        </li>
        <li className="my-2">
          attempt to reverse engineer any software contained on BorrowAPencil's
          Website
        </li>
        <li className="my-2">
          remove any copyright or other proprietary notations from the
          materials
        </li>
        <li className="my-2">
          transfer the materials to another person or "mirror" the materials
          on any other server.
        </li>
      </ul>

      <p className="font-thin text-center">
        This will let BorrowAPencil to terminate upon violations of any of these
        restrictions. Upon termination, your viewing right will also be
        terminated and you should destroy any downloaded materials in your
        possession whether it is printed or electronic format.
      </p>

      <h2 className="text-2xl my-5">Disclaimer</h2>

      <p className="font-thin text-center">
        All the materials on BorrowAPencil’s Website are provided "as is".
        BorrowAPencil makes no warranties, may it be expressed or implied,
        therefore negates all other warranties. Furthermore, BorrowAPencil does
        not make any representations concerning the accuracy or reliability of
        the use of the materials on its Website or otherwise relating to such
        materials or any sites linked to this Website.
      </p>

      <h2 className="text-2xl my-5">Limitations</h2>

      <p className="font-thin text-center">
        BorrowAPencil or its suppliers will not be hold accountable for any
        damages that will arise with the use or inability to use the materials
        on BorrowAPencil’s Website, even if BorrowAPencil or an authorize
        representative of this Website has been notified, orally or written, of
        the possibility of such damage. Some jurisdiction does not allow
        limitations on implied warranties or limitations of liability for
        incidental damages, these limitations may not apply to you.
      </p>

      <h2 className="text-2xl my-5">Revisions and Errata</h2>

      <p className="font-thin text-center">
        The materials appearing on BorrowAPencil’s Website may include
        technical, typographical, or photographic errors. BorrowAPencil will not
        promise that any of the materials in this Website are accurate,
        complete, or current. BorrowAPencil may change the materials contained
        on its Website at any time without notice. BorrowAPencil does not make
        any commitment to update the materials.
      </p>

      <h2 className="text-2xl my-5">Links</h2>

      <p className="font-thin text-center">
        BorrowAPencil has not reviewed all of the sites linked to its Website
        and is not responsible for the contents of any such linked site. The
        presence of any link does not imply endorsement by BorrowAPencil of the
        site. The use of any linked website is at the user’s own risk.
      </p>

      <h2 className="text-2xl my-5">Site Terms of Use Modifications</h2>

      <p className="font-thin text-center">
        BorrowAPencil may revise these Terms of Use for its Website at any time
        without prior notice. By using this Website, you are agreeing to be
        bound by the current version of these Terms and Conditions of Use.
      </p>

      <h2 className="text-2xl my-5">Your Privacy</h2>

      <p className="font-thin text-center"><Link to="/privacy-policy">Please read our <u>Privacy Policy.</u></Link></p>

      <h2 className="text-2xl my-5">Governing Law</h2>

      <p className="font-thin text-center">
        Any claim related to BorrowAPencil's Website shall be governed by the
        laws of US without regards to its conflict of law provisions.
      </p>
    </article>
  );
};

export default TermsOfService;
