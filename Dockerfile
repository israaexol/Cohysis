ARG IMAGE_NAME
FROM nvidia/cuda:11.7.1-runtime-ubuntu20.04 as base

FROM base as base-amd64

ENV NV_CUDNN_VERSION 8.5.0.96
ENV NV_CUDNN_PACKAGE_NAME "libcudnn8"

ENV NV_CUDNN_PACKAGE "libcudnn8=$NV_CUDNN_VERSION-1+cuda11.7"

FROM base as base-arm64

ENV NV_CUDNN_VERSION 8.5.0.96
ENV NV_CUDNN_PACKAGE_NAME "libcudnn8"

ENV NV_CUDNN_PACKAGE "libcudnn8=$NV_CUDNN_VERSION-1+cuda11.7"

FROM base-${TARGETARCH}

ARG TARGETARCH

LABEL maintainer "NVIDIA CORPORATION <cudatools@nvidia.com>"
LABEL com.nvidia.cudnn.version="${NV_CUDNN_VERSION}"

RUN apt-get update && apt-get install -y --no-install-recommends \
    ${NV_CUDNN_PACKAGE} \
    && apt-mark hold ${NV_CUDNN_PACKAGE_NAME} \
    && rm -rf /var/lib/apt/lists/*

# install utilities
RUN apt-get update && \
    apt-get install --no-install-recommends -y curl
ENV CONDA_AUTO_UPDATE_CONDA=false \
    PATH=/opt/miniconda/bin:$PATH
RUN curl -sLo ~/miniconda.sh https://repo.anaconda.com/miniconda/Miniconda3-py38_4.9.2-Linux-x86_64.sh \
    && chmod +x ~/miniconda.sh \
    && ~/miniconda.sh -b -p /opt/miniconda \
    && rm ~/miniconda.sh \
    && sed -i "$ a PATH=/opt/miniconda/bin:\$PATH" /etc/environment
# Installing python dependencies
RUN python3 -m pip --no-cache-dir install --upgrade pip && \
    python3 --version && \
    pip3 --version

COPY ./requirements.txt .
RUN pip3 --timeout=300 --no-cache-dir install -r requirements.txt

# Copy model files
COPY ./model /model

# Copy app files
COPY ./app /app
WORKDIR /app/
ENV PYTHONPATH=/app
RUN ls -lah /app/*

COPY ./start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]