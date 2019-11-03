#!/bin/bash

CMD="cat files.txt |tr '\n' '\0' |xargs -0 git add"

if [ "${#}" -gt 0 ]; then
    echo "${CMD} ${1}"
    eval "${CMD} ${1}"
else
    echo "${CMD}"
    eval "${CMD}"
fi
