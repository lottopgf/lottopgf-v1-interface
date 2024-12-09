export interface LogoProps extends React.SVGProps<SVGSVGElement> {}

export function Logo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 49"
      xmlSpace="preserve"
      width="180"
      height="49"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
      }}
      {...props}
    >
      <path
        d="M46.546 32.804c.885 0 1.602.717 1.602 1.602 0 .587.479 1.499 2.112 2.359 1.561.822 3.83 1.378 6.428 1.378 2.599 0 4.868-.556 6.429-1.378 1.633-.86 2.112-1.772 2.112-2.36a1.61 1.61 0 0 1 1.602-1.602 1.61 1.61 0 0 1 1.602 1.602c0 2.366-1.789 4.123-3.824 5.195-2.108 1.11-4.91 1.747-7.92 1.747s-5.813-.637-7.921-1.747c-2.036-1.072-3.824-2.829-3.824-5.194 0-.885.717-1.602 1.602-1.602"
        style={{ fill: "#16a34a" }}
      />
      <path
        d="M7.56 25.544h11.62q1.409 0 2.05.342.64.299.854.982.214.684.214 1.837 0 1.11-.214 1.794-.213.684-.726.94-.812.426-2.221.427H3.759q-2.99 0-3.503-1.623-.255-.684-.256-2.179V4.314q0-.983.043-1.452.085-.513.427-1.153Q1.069.555 3.802.555q2.99 0 3.545 1.58.213.727.214 2.222zm13.453-4.912q0-5.127 3.588-8.458t8.201-3.332 8.159 3.332q3.545 3.29 3.545 8.415 0 3.545-1.837 6.322-1.837 2.733-4.485 4.058-2.605 1.281-5.425 1.281t-5.467-1.367q-2.648-1.41-4.485-4.1-1.796-2.734-1.794-6.151m8.927 3.075q1.367 1.025 2.777 1.025t2.819-1.068 1.41-3.16q0-2.094-1.325-3.119T32.76 16.36t-2.862 1.068-1.324 3.16q0 2.05 1.367 3.12m40.863-6.792-2.777-.17v5.894q0 1.154.342 1.666.384.513 1.367.513 1.025 0 1.537.085.555.043 1.111.385 1.025.555 1.025 2.862 0 2.69-1.196 3.289a4.6 4.6 0 0 1-1.153.384q-.47.043-1.41.043-4.27 0-6.663-2.221-2.392-2.221-2.393-6.579v-6.322q-2.05.171-3.417.171l-3.887-.17v5.894q0 1.154.342 1.666.384.513 1.367.513 1.025 0 1.538.085.555.043 1.153.385.982.555.982 2.862 0 2.69-1.196 3.289a4.6 4.6 0 0 1-1.153.384q-.47.043-1.41.043-4.27 0-6.663-2.221-2.392-2.221-2.393-6.579v-6.322q-.854.129-1.794.129-.897 0-1.537-.727-.599-.726-.599-2.477 0-1.752.214-2.52.214-.812.598-1.154.684-.555 1.709-.555l1.41.171v-4.4q0-.982.042-1.452.086-.47.427-1.025.555-1.068 3.29-1.068 2.904 0 3.46 1.58.213.684.213 2.179v4.058q2.007-.043 3.802-.043l3.502.043V5.21q0-.983.043-1.452.085-.47.384-1.025.6-1.068 3.332-1.068 2.905 0 3.418 1.58.255.684.256 2.179V9.61q1.88-.171 2.82-.171.981 0 1.452.085.512.043 1.11.385 1.154.555 1.153 3.29 0 2.69-1.153 3.288-.64.3-1.153.385-.725.051-1.452.042m.766 3.717q0-5.127 3.588-8.458t8.202-3.332 8.158 3.332q3.546 3.29 3.546 8.415 0 3.545-1.837 6.322-1.838 2.733-4.485 4.058-2.606 1.281-5.425 1.281t-5.468-1.367q-2.647-1.41-4.485-4.1-1.794-2.734-1.794-6.151m8.928 3.075q1.366 1.025 2.776 1.025t2.82-1.068 1.41-3.16q0-2.094-1.325-3.119t-2.862-1.025-2.862 1.068-1.324 3.16q0 2.05 1.367 3.12"
        style={{ fill: "#16a34a", fillRule: "nonzero" }}
      />
      <path
        d="M120.932 6.877q1.111 2.265 1.111 5.04 0 2.778-1.111 5.041-1.11 2.22-2.862 3.546-3.544 2.733-7.347 2.733h-5.34v4.827q0 .983-.085 1.495-.043.471-.384 1.11-.599 1.155-3.332 1.154-2.99 0-3.503-1.58-.255-.727-.256-2.221V4.314q0-.983.043-1.452.084-.513.427-1.153.597-1.154 3.332-1.154h9.141q3.758 0 7.304 2.734 1.752 1.325 2.862 3.588m-10.166 8.8q1.281 0 2.52-.94 1.239-.939 1.239-2.82 0-1.878-1.239-2.819-1.239-.982-2.563-.982h-5.34v7.56zm30.364-2.691h7.518q2.306.084 2.82 1.196.426.81.427 2.392v9.397q0 1.367-1.197 2.606-3.59 3.716-10.764 3.716-6.365 0-11.063-4.784-4.7-4.825-4.699-11.619 0-6.791 4.784-11.32Q133.741 0 140.232 0q5.041 0 9.526 3.332 1.154.855 1.154 1.922 0 1.025-.983 2.392-1.665 2.264-3.034 2.264-.808 0-2.605-1.153-1.793-1.197-4.27-1.196-3.25 0-5.768 2.306-2.52 2.265-2.52 5.98 0 3.675 2.563 6.28 2.562 2.563 5.81 2.563 2.35 0 4.229-.77v-4.655h-3.375q-1.325 0-1.88-.342a1.6 1.6 0 0 1-.725-.982q-.173-.684-.171-1.794 0-1.155.171-1.837.212-.684.725-.94.77-.384 2.051-.384M176.023.556q.984 0 1.451.085.514.042 1.112.384.641.342.898 1.153.255.813.256 2.179 0 1.367-.256 2.178-.257.813-.898 1.154-.641.3-1.153.384a18 18 0 0 1-1.495.043h-13.071v4.314h8.415q1.023 0 1.495.086.512.042 1.153.384 1.11.64 1.11 3.375 0 2.99-1.622 3.545-.684.213-2.18.214h-8.371v8.073q0 1.026-.085 1.495-.044.47-.385 1.11-.598 1.155-3.332 1.154-2.99 0-3.503-1.623-.256-.684-.256-2.179V4.314q0-2.178.811-2.947.811-.812 3.075-.812z"
        style={{ fillRule: "nonzero" }}
      />
      <path
        d="M148.191 46.06c0 .777-1.193 1.405-2.668 1.405s-2.669-.628-2.669-1.405"
        style={{
          fill: "none",
          fillRule: "nonzero",
          stroke: "#16a34a",
          strokeWidth: "1.41px",
        }}
      />
      <path
        d="M127.136 39.438q1 0 1.831.888.843.887.843 2.067 0 1.169-.832 2.056-.83.877-1.786.877-.955 0-1.36-.54-.09.55-.966.55-.708 0-.865-.303a1.2 1.2 0 0 1-.101-.292 5 5 0 0 1-.012-.393V37.64q0-.258.012-.382.022-.135.101-.292.157-.303.876-.303.708 0 .854.303a.8.8 0 0 1 .101.303q.023.124.023.382v2.337q.448-.55 1.281-.55m-.989 3.63a.91.91 0 0 0 .696.303.94.94 0 0 0 .708-.304.95.95 0 0 0 .292-.674 1 1 0 0 0-.269-.674.9.9 0 0 0-.719-.315q-.45 0-.719.315-.26.315-.259.685 0 .36.27.663m8.66-3.574q.664.292.663.708a.84.84 0 0 1-.089.382 2 2 0 0 0-.091.191l-2.943 6.584q-.09.214-.157.326a.6.6 0 0 1-.191.214.56.56 0 0 1-.337.1q-.203 0-.596-.168-.663-.292-.663-.696 0-.27 1.079-2.573l-2.236-3.764q-.225-.37-.225-.551 0-.36.607-.72.382-.224.595-.224.214 0 .349.09t.191.19q.067.091.618 1.046.561.944 1.067 1.764.057-.18.607-1.382l.584-1.292q.062-.1.135-.191a.48.48 0 0 1 .405-.191q.269 0 .628.157m22.569-2.393 2.08.011q1.629 0 2.865 1.18 1.234 1.168 1.236 2.888 0 1.707-1.214 2.932-1.202 1.225-2.921 1.225h-2.056q-.685 0-.854-.28-.133-.237-.135-.72v-6.248q0-.27.011-.393.023-.123.113-.292.157-.303.875-.303m2.08 6.247q.81 0 1.461-.595.65-.607.65-1.517t-.639-1.517a2.05 2.05 0 0 0-1.484-.618h-1.078v4.247zm9.025-5.652 3.034 6.27q.19.383.191.573 0 .405-.651.73-.382.192-.606.192a.6.6 0 0 1-.36-.102.8.8 0 0 1-.203-.213l-.168-.337-.585-1.214h-3.111l-.585 1.214a3 3 0 0 1-.18.326.8.8 0 0 1-.202.213.6.6 0 0 1-.359.101q-.216 0-.596-.19-.652-.315-.652-.72 0-.19.19-.573l3.034-6.281q.124-.258.372-.416.257-.157.538-.157.608 0 .899.584m-.91 2.697-.741 1.54h1.495zm8.055-3.382q1.662 0 2.888 1.202 1.224 1.203 1.225 2.989 0 1.776-1.168 3.034-1.17 1.247-2.878 1.247t-2.91-1.236q-1.19-1.236-1.19-2.944 0-.933.336-1.741c.203-.513.509-.98.899-1.371.373-.367.811-.66 1.292-.866q.73-.315 1.506-.314m-2.045 4.236q0 1 .641 1.63.651.617 1.449.617.799 0 1.439-.607.64-.606.64-1.629 0-1.022-.653-1.64-.64-.618-1.436-.618-.799 0-1.439.629-.64.618-.641 1.618"
        style={{ fillRule: "nonzero" }}
      />
      <path
        d="M135.84 42.313q.001-1.348.944-2.225.943-.876 2.158-.876t2.146.876q.932.866.932 2.214 0 .932-.483 1.663-.482.72-1.179 1.067a3.2 3.2 0 0 1-1.428.337 3.1 3.1 0 0 1-1.437-.36 3.3 3.3 0 0 1-1.181-1.078 2.9 2.9 0 0 1-.472-1.618m2.349.81q.359.269.73.269.37 0 .741-.281.373-.28.372-.832 0-.55-.348-.82a1.2 1.2 0 0 0-.754-.27q-.404 0-.752.281-.35.282-.349.832 0 .54.36.82m10.636-1.787-.73-.045v1.55q0 .305.09.438.1.135.36.135.27 0 .403.023a.65.65 0 0 1 .293.1q.27.148.27.754 0 .708-.316.865a1.2 1.2 0 0 1-.303.101 5 5 0 0 1-.371.011q-1.123 0-1.753-.584-.628-.584-.628-1.73V41.29q-.54.045-.899.045l-1.023-.045v1.55q0 .305.091.438.1.135.359.135.27 0 .404.023.148.011.303.1.26.148.26.754 0 .708-.316.865a1.2 1.2 0 0 1-.304.101 5 5 0 0 1-.37.011q-1.124 0-1.753-.584t-.629-1.73V41.29a3 3 0 0 1-.472.033.52.52 0 0 1-.403-.19q-.16-.192-.158-.652 0-.46.056-.663.056-.214.158-.304a.7.7 0 0 1 .449-.146l.37.045v-1.157q0-.258.011-.382a.8.8 0 0 1 .113-.27q.145-.28.864-.28.766 0 .911.415.056.18.056.573v1.067q.529-.01 1.001-.01l.921.01v-1.123q0-.258.011-.382a.9.9 0 0 1 .101-.27q.157-.28.876-.28.766 0 .899.415.068.18.068.573v1.101q.495-.045.741-.045.257 0 .383.023a.7.7 0 0 1 .292.1q.304.147.304.866 0 .708-.304.865a1.2 1.2 0 0 1-.303.101 5 5 0 0 1-.383.012m.201.977q0-1.348.945-2.225.944-.876 2.156-.876 1.216 0 2.148.876.932.865.932 2.214a2.93 2.93 0 0 1-.484 1.663 3.07 3.07 0 0 1-1.179 1.067 3.2 3.2 0 0 1-1.428.337q-.741 0-1.436-.36a3.3 3.3 0 0 1-1.181-1.078 2.9 2.9 0 0 1-.473-1.618m2.349.81q.36.269.731.269.37 0 .741-.281.37-.28.37-.832 0-.55-.347-.82a1.2 1.2 0 0 0-.754-.27 1.18 1.18 0 0 0-.752.281q-.348.282-.348.832 0 .54.359.82"
        style={{ fill: "#16a34a", fillRule: "nonzero" }}
      />
    </svg>
  );
}
