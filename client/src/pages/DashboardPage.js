import React from "react";
import Calendar from "react-calendar";
import { Messages } from "../components/Messages";

export const DashboardPage = ({location,match}) => {
  console.log(match,location)
  return (
    <React.Fragment>
      <Messages />
      
        <Calendar locale="en" view="year" />
     
      
        <p>
          Aenean eu neque fringilla nisi rhoncus pulvinar. Morbi vitae erat
          aliquet, pulvinar neque nec, blandit magna. Vestibulum at nisl arcu.
          Praesent sit amet faucibus mi, ut blandit massa. Duis dictum lobortis
          sagittis. Sed rutrum blandit lorem, at commodo risus egestas
          pellentesque. Nunc efficitur, justo sed euismod viverra, justo ipsum
          efficitur tortor, ut consequat est tortor sed nisi. Proin sit amet
          lorem quis elit porttitor porta. Sed aliquet nisi libero, a feugiat
          augue suscipit id. Quisque pretium tincidunt enim, nec aliquet nunc
          facilisis ac. Maecenas semper, est at tempus rutrum, est nisl blandit
          ligula, a dictum tortor dolor ut ipsum.
        </p>

        <p>
          Praesent iaculis tortor nulla, sed molestie diam gravida malesuada. In
          nec ligula suscipit, ultrices urna ut, viverra turpis. Proin efficitur
          nunc a nisi bibendum interdum. Morbi commodo leo dolor, et euismod
          purus suscipit vel. Proin pellentesque arcu nulla, vitae faucibus
          massa tempus quis. Integer posuere, dolor nec tincidunt molestie,
          tortor magna mattis arcu, sit amet ultrices ligula neque quis justo.
          Duis consequat felis id metus ornare sagittis. Morbi non nisl lacus.
          Proin vehicula cursus tristique. Curabitur rhoncus elit vel nunc
          viverra commodo. Vestibulum eget nibh diam. Sed maximus, risus a
          tincidunt pharetra, purus tellus hendrerit mauris, eu sodales arcu
          lorem ut nulla. Vivamus iaculis pellentesque magna, vel porta ex
          interdum non.
        </p>

        <p>
          Nullam a tellus metus. Aenean leo odio, egestas nec tortor vel,
          venenatis dapibus tellus. Vestibulum ac sem risus. Quisque convallis
          neque faucibus pulvinar fringilla. Duis accumsan sem vitae elit
          consequat rhoncus nec eget erat. In felis enim, iaculis ut lacus ac,
          malesuada rutrum felis. In eu turpis posuere ligula efficitur mollis.
          Suspendisse ut porta dolor. Donec pretium est quis nisl pharetra, eu
          tempus tortor bibendum. In convallis pretium sapien vitae facilisis.
          Pellentesque ut semper nulla, eu tincidunt est. Nulla laoreet luctus
          mi congue scelerisque. In sagittis risus non gravida mattis. In hac
          habitasse platea dictumst. Fusce erat ipsum, euismod vel molestie
          vitae, sollicitudin nec neque. Morbi posuere nec magna luctus
          imperdiet. Donec vel bibendum elit, sit amet feugiat lectus. Fusce
          varius quis magna vitae varius. Curabitur at metus enim. Suspendisse
          ullamcorper quis nisl sed ultricies. Pellentesque laoreet, orci sed
          ultrices laoreet, odio turpis finibus elit, vitae bibendum arcu lectus
          ac risus. Nullam enim magna, vehicula eu dapibus a, venenatis at
          tellus.
        </p>
      
    </React.Fragment>
  );
};
