{
  "targets": [
    {
      "target_name": "addon",
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags_cc!": [
        "-fno-exceptions",
        "-Wno-overloaded-virtual "
      ],
      "variables": {
        "nuodb_home": "<!(echo ${NUODB_HOME-\"/opt/nuodb\"})"
      },
      "sources": [
        "src/addon.cc",
        "src/njsDatabase.cc"
      ],
      "include_dirs": [
        "/opt/nuodb/include/",
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "libraries": [
        "-ldl",
        "-lpthread",
        "-Wl,-rpath,<(nuodb_home)/lib64",
        "-L<(nuodb_home)/lib64",
        "-lNuoRemote"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS"
      ]
    }
  ]
}
